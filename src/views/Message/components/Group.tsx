import { Tooltip } from 'antd';
import { FC, memo } from 'react';
import '../styles.scss';

interface GroupProps {
    name: string;
    desc?: string;
    id: number;
    activeGrp?: number;
    setActiveGrp?: (value: number) => void;
    socket: any;
}

const Group: FC<GroupProps> = memo(
    ({ name, desc, id, activeGrp, setActiveGrp, socket }) => {
        const handleSelectGroup = () => {
            setActiveGrp && setActiveGrp(id);
            socket.emit('join', id);
        };

        return (
            <div
                className={`group ${id === activeGrp ? 'group-active' : ''}`}
                onClick={handleSelectGroup}
            >
                <div className="group--item">
                    <img
                        src="/images/group-chat.jpg"
                        alt="gr-avatar"
                        className="group--img"
                    />
                    <div className="group--info">
                        <Tooltip placement="right" title={name}>
                            <span className="group--name">{name}</span>
                        </Tooltip>
                        <span className="group--desc">{desc}</span>
                    </div>
                </div>
            </div>
        );
    }
);

Group.displayName = 'Message Group';

export default Group;
