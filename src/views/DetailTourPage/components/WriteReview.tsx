import { Button, Form, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Message from 'components/Message';
import { FC, memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerId, getToken } from 'reducers/token/function';
import commentService from 'services/commentService';
import './styles.scss';

interface WriteReviewProps {
    reload: boolean;
    setReload: (value: boolean) => void;
    curPayment: number;
    isTourIdExists: boolean;
}

const WriteReview: FC<WriteReviewProps> = memo(
    ({ reload, setReload, curPayment, isTourIdExists }) => {
        const [form] = Form.useForm();
        const { tour_id } = useParams();
        const userId = String(getCustomerId());
        const token = getToken();

        const [loading, setLoading] = useState(false);

        const handleCreateReview = useCallback(
            async (values: { content: string; number_rate: number }) => {
                try {
                    if (!isTourIdExists) {
                        Message.sendError(
                            'Bạn phải đặt tour này trước khi có thể đánh giá'
                        );
                        return;
                    }
                    setLoading(true);
                    const { content, number_rate } = values;

                    const formData = new FormData();
                    formData.append('number_rate', String(number_rate));
                    formData.append('payment_id', String(curPayment));
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

                    const response = await commentService.createReview(
                        token,
                        formData
                    );
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
            [
                curPayment,
                form,
                isTourIdExists,
                reload,
                setReload,
                token,
                tour_id,
                userId,
            ]
        );

        return (
            <div className="write--comment">
                <p>Cảm nhận của bạn về tour du lịch</p>
                <Form
                    form={form}
                    name="review-tour"
                    onFinish={handleCreateReview}
                >
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={loading}
                        >
                            Gửi đánh giá
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
);

WriteReview.displayName = 'WriteReview';

export default WriteReview;
