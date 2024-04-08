import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerId } from 'reducers/token/function';
import commentService from 'services/commentService';
import tourService from 'services/tourService';
import userService from 'services/userService';
import Inner from 'views/DetailTourPage/Inner';

const Wrapper = memo(() => {
    const { tour_id } = useParams();
    const userId = getCustomerId();

    const [tourData, setTourData] = useState([]);
    const [loveList, setLoveList] = useState([]);
    const [commentsList, setCommentsList] = useState([]);
    const [isGetLoveList, setIsGetLoveList] = useState(false);
    const [reload, setReload] = useState(false);

    const handleGetTourData = useCallback(async () => {
        try {
            const response = await tourService.getOneTour(tour_id);
            if (response?.status === 200) {
                setTourData(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    const handleGetWishListTours = useCallback(async () => {
        try {
            if (userId === 0) {
                return;
            }
            const response = await userService.getWishList(userId);
            if (response?.status === 200) {
                const tempLoveList = response.data.data.map(
                    item => item.tour_id
                );
                setLoveList(tempLoveList);
                setIsGetLoveList(true);
            }
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    const handleGetComment = useCallback(async () => {
        try {
            const response = await commentService.getAllComments(tour_id);
            if (response?.status === 200) {
                setCommentsList(response.data.comments);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    useEffect(() => {
        handleGetTourData();
    }, [handleGetTourData]);

    useEffect(() => {
        handleGetWishListTours();
    }, [handleGetWishListTours]);

    useEffect(() => {
        handleGetComment();
    }, [handleGetComment, reload]);

    return (
        <Inner
            tourData={tourData}
            loveList={loveList}
            commentsList={commentsList}
            setLoveList={setLoveList}
            isGetLoveList={isGetLoveList}
            reload={reload}
            setReload={setReload}
        />
    );
});

Wrapper.displayName = 'Detail Tour';

const DetailTourPage = Wrapper;

export default DetailTourPage;
