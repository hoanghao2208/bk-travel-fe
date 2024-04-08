import dayjs from 'dayjs';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import commentService from 'services/commentService';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import ReplyComment from 'views/DetailTourPage/components/ReplyComment';
import './styles.scss';

interface CommentProps {
    name?: string;
    date: string;
    content: string;
    cmtId?: number;
    allowedReply: boolean;
    reload: boolean;
    setReload: (value: boolean) => void;
}

interface CommentListProps {
    name?: string;
    date: string;
    content: string;
    parentId: number;
    reload: boolean;
    setReload: (value: boolean) => void;
}

const Comment: FC<CommentProps> = memo(
    ({
        name = 'Người dùng BK Travel',
        date,
        content,
        cmtId,
        allowedReply,
        reload,
        setReload,
    }) => {
        const [isDisplay, setIsDisplay] = useState(false);

        return (
            <>
                <div className="user-comment">
                    <div className="user-comment__header">
                        <span className="user-comment__header--name">
                            {name}
                        </span>
                        <span className="user-comment__header--date">
                            {date}
                        </span>
                    </div>
                    <p className="user-comment__content">{content}</p>
                    {allowedReply && (
                        <span
                            className="user-comment__reply"
                            onClick={() => setIsDisplay(true)}
                        >
                            Phản hồi
                        </span>
                    )}
                </div>
                <div className="user-reply">
                    <ReplyComment
                        isDisplay={isDisplay}
                        setIsDisplay={setIsDisplay}
                        cmtId={cmtId ?? 0}
                        reload={reload}
                        setReload={setReload}
                    />
                </div>
            </>
        );
    }
);

const CommentList: FC<CommentListProps> = memo(
    ({
        name = 'Người dùng BK Travel',
        date,
        content,
        parentId,
        reload,
        setReload,
    }) => {
        const { tour_id } = useParams();

        const [childComments, setChildComments] = useState([]);

        const getChildrenComments = useCallback(async () => {
            try {
                if (!tour_id) {
                    return;
                }

                const response = await commentService.getCommentByParentId(
                    parentId,
                    parseInt(tour_id)
                );

                if (response?.status === 200) {
                    setChildComments(response.data.comments);
                }
            } catch (error) {
                console.error(error);
            }
        }, [parentId, tour_id]);

        useEffect(() => {
            getChildrenComments();
        }, [getChildrenComments, reload]);

        return (
            <div className="parent--cmt">
                <Comment
                    name={name}
                    date={date}
                    content={content}
                    cmtId={parentId}
                    allowedReply={true}
                    reload={reload}
                    setReload={setReload}
                />
                <div className="parent--cmt--list">
                    {childComments.map((cmt: any) => (
                        <Comment
                            key={cmt.comment_id}
                            name={cmt.user_name}
                            date={dayjs(cmt.createdAt).format(
                                DEFAULT_DISPLAY_DATE_FORMAT
                            )}
                            content={cmt.content}
                            allowedReply={false}
                            reload={reload}
                            setReload={setReload}
                        />
                    ))}
                </div>
            </div>
        );
    }
);

Comment.displayName = 'Comment';
CommentList.displayName = 'CommentList';

export default CommentList;
