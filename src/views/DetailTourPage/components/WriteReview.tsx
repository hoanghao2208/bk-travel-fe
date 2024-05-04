import { Button, Form, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Message from 'components/Message';
import { FC, memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerId } from 'reducers/token/function';
import commentService from 'services/commentService';
import './styles.scss';

interface WriteReviewProps {
    reload: boolean;
    setReload: (value: boolean) => void;
}

const WriteReview: FC<WriteReviewProps> = memo(({ reload, setReload }) => {
    const [form] = Form.useForm();
    const { tour_id } = useParams();
    const userId = String(getCustomerId());

    const [loading, setLoading] = useState(false);

    const handleCreateReview = useCallback(
        async (values: { content: string; number_rate: number }) => {
            try {
                setLoading(true);
                const { content, number_rate } = values;

                const formData = new FormData();
                formData.append('number_rate', String(number_rate));
                if (tour_id) {
                    formData.append('tour_id', tour_id);
                }
                if (userId) {
                    formData.append('user_id', userId);
                }
                if (content === undefined) {
                    formData.append('is_comment', 'false');
                } else {
                    formData.append('is_comment', 'true');
                    formData.append('content', content);
                }

                const response = await commentService.createReview(formData);
                if (response?.status === 200) {
                    Message.sendSuccess('Bạn đã gửi đánh giá thành công');
                    form.resetFields();
                    setReload(!reload);
                }
            } catch (error) {
                console.error(error);
                Message.sendError(
                    'Đã có lỗi xãy ra, bạn đã đánh giá không thành công'
                );
            } finally {
                setLoading(false);
            }
        },
        [form, reload, setReload, tour_id, userId]
    );

    return (
        <div className="write--comment">
            <p>Cảm nhận của bạn về tour du lịch</p>
            <Form form={form} name="review-tour" onFinish={handleCreateReview}>
                <div className="write--comment--rating">
                    <Form.Item
                        name="number_rate"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đánh giá của bạn',
                            },
                        ]}
                    >
                        <Rate />
                    </Form.Item>
                </div>
                <Form.Item name="content">
                    <TextArea
                        autoSize={{ minRows: 6, maxRows: 9 }}
                        placeholder="Nhập bình luận của bạn"
                    />
                </Form.Item>
                <div className="write--comment__btn">
                    <Button type="primary" htmlType="submit" disabled={loading}>
                        Gửi đánh giá
                    </Button>
                </div>
            </Form>
        </div>
    );
});

WriteReview.displayName = 'WriteReview';

export default WriteReview;
