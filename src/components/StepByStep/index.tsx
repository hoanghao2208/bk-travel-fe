import { Steps } from 'antd';
import { FC, memo } from 'react';
import './styles.scss';

interface StepByStepProps {
    currentPage: number;
}

const StepByStep: FC<StepByStepProps> = memo(({ currentPage }) => {
    return (
        <Steps
            current={currentPage}
            items={[
                {
                    title: 'Chọn tour phù hợp',
                },
                {
                    title: 'Điền thông tin',
                },
                {
                    title: 'Thanh toán',
                },
            ]}
        />
    );
});

StepByStep.displayName = 'Step By Step';

export default StepByStep;
