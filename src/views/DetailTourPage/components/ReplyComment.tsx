import { Button, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Message from 'components/Message';
import { FC, memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerId } from 'reducers/token/function';
import commentService from 'services/commentService';

interface ReplyCommentProps {
    isDisplay: boolean;
    setIsDisplay: (value: boolean) => void;
    cmtId: number;
    reload: boolean;
    setReload: (value: boolean) => void;
}

const ReplyComment: FC<ReplyCommentProps> = memo(
    ({ isDisplay, setIsDisplay, cmtId, reload, setReload }) => {
        const [form] = Form.useForm();
        const { tour_id } = useParams();
        const userId = String(getCustomerId());

        const [loading, setLoading] = useState(false);

        const handleReplyComment = useCallback(
            async (values: { content: string }) => {
                try {
                    setLoading(true);
                    const formData = new FormData();

                    formData.append('content', values.content);
                    formData.append('parent_comment_id', String(cmtId));

                    if (tour_id) {
                        formData.append('tour_id', tour_id);
                    }
                    if (userId) {
                        formData.append('user_id', userId);
                    }

                    const response = await commentService.createComment(
                        formData
                    );

                    if (response?.status === 200) {
                        Message.sendSuccess('Bạn đã bình luận thành công');
                        form.resetFields();
                        setReload(!reload);
                        setIsDisplay(false);
                    }
                } catch (error) {
                    console.error(error);
                    Message.sendError('Đã có lỗi xãy ra, vui lòng thử lại');
                } finally {
                    setLoading(false);
                }
            },
            [cmtId, form, reload, setIsDisplay, setReload, tour_id, userId]
        );

        if (!isDisplay) {
            return null;
        }

        return (
            <div className="write--comment">
                <p>Phản hồi bình luận</p>
                <Form
                    form={form}
                    name="reply-comment"
                    onFinish={handleReplyComment}
                >
                    <Form.Item
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập bình luận của bạn',
                            },
                        ]}
                    >
                        <TextArea
                            autoSize={{ minRows: 6, maxRows: 9 }}
                            placeholder="Phản hồi bình luận"
                        />
                    </Form.Item>
                    <div className="write--comment__btn">
                        <Button onClick={() => setIsDisplay(false)}>Hủy</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={loading}
                        >
                            Gửi bình luận
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
);

ReplyComment.displayName = 'Reply Comment';

export default ReplyComment;
