import { Input } from 'antd';
import { FC, memo, useRef } from 'react';
import './styles.scss';

interface ChangePasswordItemProps {
    title: string;
}

interface InputRef {
    input: HTMLInputElement | null;
    focus: () => void;
    blur: () => void;
    setSelectionRange: (start: number, end: number) => void;
    select: () => void;
}

const ChangePasswordItem: FC<ChangePasswordItemProps> = memo(({ title }) => {
    const inputRef = useRef<InputRef>(null);
    const handleClick = () => {
        if (inputRef.current && inputRef.current.input) {
            inputRef.current.input.focus();
        }
    };
    return (
        <div className="change-password-item">
            <h3 className="change-password-item__title" onClick={handleClick}>
                {title}
            </h3>
            <div className="change-password-item__password">
                <Input.Password placeholder={title} ref={inputRef} />
            </div>
        </div>
    );
});

ChangePasswordItem.displayName = 'Change Password Item';

export default ChangePasswordItem;
