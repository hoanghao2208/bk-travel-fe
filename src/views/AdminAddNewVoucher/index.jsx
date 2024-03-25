import { Form, Spin } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useState } from 'react';
import voucherService from 'services/voucherService';
import Inner from 'views/AdminAddNewVoucher/Inner';

const Wrapper = memo(() => {
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imgURL, setImgURL] = useState('');
    const [showUpload, setShowUpload] = useState(true);

    const handleCreateNewVoucher = useCallback(
        async data => {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            try {
                setLoading(true);
                const response = await voucherService.createVoucher(formData);

                if (response?.status === 200) {
                    Message.sendSuccess('Tạo mã giảm giá mới thành công');
                    setFileList([]);
                    setImgURL('');
                    setShowUpload(true);
                    form.resetFields();
                } else {
                    Message.sendError(
                        'Đã có lỗi xãy ra, vui lòng kiểm tra lại'
                    );
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        [form]
    );

    return (
        <Spin tip="Vui lòng chờ" size="large" spinning={loading}>
            <Inner
                form={form}
                fileList={fileList}
                setFileList={setFileList}
                imgURL={imgURL}
                setImgURL={setImgURL}
                showUpload={showUpload}
                setShowUpload={setShowUpload}
                handleCreateNewVoucher={handleCreateNewVoucher}
            />
        </Spin>
    );
});

Wrapper.displayName = 'Admin Add New Voucher';

const AdminAddNewVoucher = Wrapper;

export default AdminAddNewVoucher;