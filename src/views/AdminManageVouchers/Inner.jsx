import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import ModalDelete from 'views/AdminManageVouchers/components/ModalDelete';
import ModalViews from 'views/AdminManageVouchers/components/ModalViews';
import './styles.scss';

const Inner = memo(({ voucherData, setIsReload }) => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);
    const [openModalView, setOpenModalView] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const handleOpenView = useCallback(id => {
        setOpenModalView(true);
        setSelectedId(id);
    }, []);

    const handleOpenDelete = useCallback(id => {
        setOpenModalDelete(true);
        setSelectedId(id);
    }, []);

    const columns = useMemo(() => {
        return [
            {
                title: 'ID',
                align: 'center',
                render: (text, record, index) => index + 1,
            },
            {
                title: 'Tên mã giảm',
                dataIndex: 'description',
                align: 'center',
            },
            {
                title: 'Số lượng tối đa',
                dataIndex: 'max_number',
                align: 'center',
            },
            {
                title: 'Còn lại',
                dataIndex: 'remain_number',
                align: 'center',
            },
            {
                title: 'Trạng thái',
                dataIndex: 'is_active',
                align: 'center',
                render: value =>
                    value ? (
                        <span className={`status ${value ? 'active' : ''}`}>
                            Đang hoạt động
                        </span>
                    ) : (
                        <span className={`status ${value ? '' : 'expired'}`}>
                            Hết hạn
                        </span>
                    ),
            },
            {
                title: 'Ngày hết hạn',
                dataIndex: 'expired_date',
                align: 'center',
                render: value =>
                    dayjs(value).format(DEFAULT_DISPLAY_DATE_FORMAT),
            },
            {
                title: '',
                key: 'action',
                render: (_, row) => {
                    return (
                        <div className="admin-mng-btn">
                            <Tooltip placement="top" title="Xem chi tiết">
                                <Button
                                    onClick={() =>
                                        handleOpenView(row.voucher_id)
                                    }
                                >
                                    <EyeOutlined />
                                </Button>
                            </Tooltip>
                            <Tooltip placement="top" title="Xóa">
                                <Button
                                    danger
                                    onClick={() =>
                                        handleOpenDelete(row.voucher_id)
                                    }
                                >
                                    <DeleteOutlined />
                                </Button>
                            </Tooltip>
                        </div>
                    );
                },
            },
        ];
    }, [handleOpenDelete, handleOpenView]);

    return (
        <AdminLayout>
            <div className="admin-mng-vouchers">
                <div className="admin-mng-vouchers__header">
                    <h2 className="admin-mng-vouchers__header--title">
                        BK - Travel
                    </h2>
                    <div className="admin-mng-vouchers__header--btn">
                        <Button
                            onClick={() =>
                                navigate(routeConstants.ADMIN_ADD_NEW_VOUCHER)
                            }
                        >
                            Thêm Mã giảm giá mới
                        </Button>
                    </div>
                </div>
                <div className="admin-mng-vouchers__content">
                    <h3 className="admin-tour-guides__content--title">
                        Danh sách tất cả các mã giảm giá trên hệ thống
                    </h3>
                    <div className="admin-tour-guides__content--table">
                        <Table
                            columns={columns}
                            dataSource={voucherData}
                            pagination={false}
                        />
                    </div>
                </div>
            </div>
            <ModalViews
                isOpen={openModalView}
                setIsOpen={setOpenModalView}
                selectedId={selectedId}
                data={voucherData}
            />
            <ModalDelete
                isOpen={openModalDelete}
                setIsOpen={setOpenModalDelete}
                selectedId={selectedId}
                data={voucherData}
                setIsReload={setIsReload}
            />
        </AdminLayout>
    );
});

Inner.displayName = 'Admin Manage Vouchers Inner';

export default Inner;
