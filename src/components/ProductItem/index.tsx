import { FC, memo } from 'react';
import './styles.scss';

const ProductItem: FC = memo(() => {
    return (
        <div className="product-item">
            <div className="product-item__img">
                <img src="/images/slide2.jpg" alt="product-img" />
            </div>
            <div className="product-item__detail">
                <h3 className="product-item__detail--title">
                    Đà Nẵng – KDL Bà Nà – Sơn Trà – Hội An – La Vang - Động
                    Phong Nha – Làng hương Thủy Xuân - Huế
                </h3>
                <div className="product-item__detail--inf1">
                    <span className="product-item__detail--inf1-col1">
                        Ngày 10/10/2023
                    </span>
                    <span className="product-item__detail--inf1-col2">
                        3 ngày, 2 đêm
                    </span>
                    <span className="product-item__detail--inf1-col3">
                        Khởi hành TP. Hồ Chí Minh
                    </span>
                </div>
                <div className="product-item__detail--inf2">
                    <span className="product-item__detail--inf2-col1">
                        Số lượng hành khách:{' '}
                    </span>
                    <span className="product-item__detail--inf2-col2">
                        2 người lớn
                    </span>
                    <span className="product-item__detail--inf2-col3">
                        2 trẻ em
                    </span>
                </div>
            </div>
        </div>
    );
});

ProductItem.displayName = 'Product Item';

export default ProductItem;
