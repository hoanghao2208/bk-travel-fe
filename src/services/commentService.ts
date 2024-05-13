import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class CommentService extends ApiBase {
    getAllComments = (tourId: number) => {
        const url = `http://localhost:8080/api/v1/tours/${tourId}/comments`;
        return axios.get(url);
    };

    getCommentByParentId = (parent_comment_id: number, tour_id: number) => {
        const url = `http://localhost:8080/api/v1/tours/${tour_id}/comments/${parent_comment_id}`;
        return axios.get(url);
    };

    createComment = (token: string, requestBody: any) => {
        const url = 'http://localhost:8080/api/v1/comments';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    createReview = (token: string, requestBody: any) => {
        const url = 'http://localhost:8080/api/v1/reviews';
        return axios.post(url, requestBody, {
            headers: {
                Authorization: `${token}`,
            },
        });
    };

    getAllReviewsByTourId = (tour_id: number) => {
        const url = `http://localhost:8080/api/v1/tours/${tour_id}/reviews`;
        return axios.get(url);
    };

    deleteComment = (
        token: string,
        requestBody: {
            tour_id: number;
            comment_id: number;
        }
    ) => {
        const url = 'http://localhost:8080/api/v1/comments';
        return axios.delete(url, {
            data: requestBody,
            headers: {
                Authorization: `${token}`,
            },
        });
    };
}

const commentService = new CommentService();

export default commentService;
