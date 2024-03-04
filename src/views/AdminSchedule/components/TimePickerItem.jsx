import { memo, useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import './style.scss';
import dayjs from 'dayjs';
import FormItem from 'views/AdminSchedule/components/FormItem';

const TimePickerItem = memo(({ tourData, column }) => {
    const [countItems, setCountItems] = useState([]);

    useEffect(() => {
        if (column) {
            setCountItems(Array(column).fill(1));
        }
    }, [column]);

    const handleAddItem = index => {
        const updatedCountItems = [...countItems];
        updatedCountItems[index] += 1;
        setCountItems(updatedCountItems);
    };

    const handleFinish = values => {
        console.log('values', values);
    };

    const renderForms = () => {
        const forms = [];

        for (let i = 0; i < column; i++) {
            const date = dayjs(tourData.departure_date).add(i, 'day');
            const formItems = [];

            for (let j = 0; j < countItems[i]; j++) {
                formItems.push(<FormItem key={j} id={j + 1} />);
            }

            forms.push(
                <div key={i}>
                    <div className="location-header">
                        <p>
                            Ngày thứ {i + 1} ({date.format('DD/MM/YYYY')})
                        </p>
                        <div className="location-header__btn">
                            <Button onClick={() => handleAddItem(i)}>
                                Thêm
                            </Button>
                        </div>
                    </div>
                    <Form
                        name={`schedule-${i}`}
                        layout="vertical"
                        onFinish={handleFinish}
                        autoComplete="off"
                    >
                        {formItems}
                        <div className="location-form__btn">
                            <Button type="primary" htmlType="submit">
                                Xác nhận
                            </Button>
                        </div>
                    </Form>
                </div>
            );
        }
        return forms;
    };

    return <div className="location-wrapper">{renderForms()}</div>;
});

TimePickerItem.displayName = 'TimePicker Item';

export default TimePickerItem;
