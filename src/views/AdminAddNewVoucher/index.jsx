import { Form, Spin } from 'antd';
import Message from 'components/Message';
import { memo, useCallback, useState } from 'react';
import { getToken } from 'reducers/token/function';
import voucherService from 'services/voucherService';
import Inner from 'views/AdminAddNewVoucher/Inner';

const Wrapper = memo(() => {
    const [form] = Form.useForm();
    const token = getToken();

    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imgURL, setImgURL] = useState('');
    const [reduceCost, setReduceCost] = useState('');
    const [minCost, setMinCost] = useState('');
    const [showUpload, setShowUpload] = useState(true);

    const handleCreateNewVoucher = useCallback(
        async data => {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            try {
                setLoading(true);
                const response = await voucherService.createVoucher(
                    formData,
                    token
                );

                if (response?.status === 200) {
                    Message.sendSuccess('Tạo mã giảm giá mới thành công');
                    setFileList([]);
                    setImgURL('');
                    setReduceCost('');
                    setMinCost('');
                    setShowUpload(true);
                    form.resetFields();
                }
            } catch (error) {
                console.error(error);
                Message.sendError('Đã có lỗi xãy ra, vui lòng kiểm tra lại');
            } finally {
                setLoading(false);
            }
        },
        [form, token]
    );

    return (
        <Spin tip="Vui lòng chờ" size="large" spinning={loading}>
            <Inner
                form={form}
                fileList={fileList}
                setFileList={setFileList}
                imgURL={imgURL}
                setImgURL={setImgURL}
                reduceCost={reduceCost}
                setReduceCost={setReduceCost}
                minCost={minCost}
                setMinCost={setMinCost}
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
