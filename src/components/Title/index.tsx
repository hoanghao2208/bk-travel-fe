import { FC, memo } from 'react';
import './styles.scss';

interface TitleProps {
    title: string;
}

const Title: FC<TitleProps> = memo(({ title }) => {
    return <p className="title">{title}</p>;
});

Title.displayName = 'Title';

export default Title;
