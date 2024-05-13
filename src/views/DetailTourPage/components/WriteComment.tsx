import { Button, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Message from 'components/Message';
import { FC, memo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomerId, getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import commentService from 'services/commentService';
import './styles.scss';

interface WriteCommentProps {
    reload: boolean;
    setReload: (value: boolean) => void;
}

const WriteComment: FC<WriteCommentProps> = memo(({ reload, setReload }) => {
    const { tour_id } = useParams();
    const navigate = useNavigate();
    const userId = String(getCustomerId());
    const [form] = Form.useForm();
    const token = getToken();

    const [loading, setLoading] = useState(false);

    const handleCreateComment = useCallback(
        async (values: { content: string }) => {
            try {
                if (userId === '0') {
                    navigate(routeConstants.LOGIN);
                    Message.sendWarning(
                        'Vui lòng đăng nhập để thực hiện chức năng này'
                    );
                    return;
                }
                setLoading(true);
                const formData = new FormData();

                formData.append('content', values.content);
                if (tour_id) {
                    formData.append('tour_id', tour_id);
                }
                if (userId) {
                    formData.append('user_id', userId);
                }

                const response = await commentService.createComment(
                    token,
                    formData
                );

                if (response?.status === 200) {
                    Message.sendSuccess('Bạn đã bình luận thành công');
                    form.resetFields();
                    setReload(!reload);
                }
            } catch (error) {
                console.error(error);
                Message.sendError(
                    'Đã có lỗi xãy ra, bạn bình luận không thành công'
                );
            } finally {
                setLoading(false);
            }
        },
        [form, navigate, reload, setReload, token, tour_id, userId]
    );

    return (
        <div className="write--comment">
            <p>Nhập bình luận của bạn tại đây</p>
            <Form
                form={form}
                name="write-comment"
                onFinish={handleCreateComment}
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
                        placeholder="Nhập bình luận của bạn"
                    />
                </Form.Item>
                <div className="write--comment__btn">
                    <Button type="primary" htmlType="submit" disabled={loading}>
                        Gửi bình luận
                    </Button>
                </div>
            </Form>
        </div>
    );
});

WriteComment.displayName = 'WriteComment';

export default WriteComment;
