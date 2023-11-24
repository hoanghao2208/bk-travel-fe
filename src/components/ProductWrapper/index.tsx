import { Button } from 'antd';
import ProductItem from 'components/ProductItem';
import { FC, memo } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './styles.scss';

const ProductWrapper: FC = memo(() => {
    return (
        <div className="product-wrapper">
            <div className="product-wrapper__content">
                <ProductItem />
            </div>
            <div className="product-wrapper__footer">
                <div className="product-wrapper__footer--button">
                    <Button type="primary" icon={<EditOutlined />}>
                        Chỉnh sửa
                    </Button>
                    <Button danger icon={<DeleteOutlined />}>
                        Xóa
                    </Button>
                </div>
                <span className="product-wrapper__footer--price">
                    đ 10.500.802
                </span>
            </div>
        </div>
    );
});

ProductWrapper.displayName = 'Product Wrapper';

export default ProductWrapper;
