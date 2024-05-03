import { Tooltip } from 'antd';
import { FC, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles.scss';

interface GroupProps {
    name: string;
    desc?: string;
    id: number;
    activeGrp?: number;
    setActiveGrp?: (value: number) => void;
}

const Group: FC<GroupProps> = memo(
    ({ name, desc, id, activeGrp, setActiveGrp }) => {
        const [searchParams, setSearchParams] = useSearchParams();

        const handleSelectGroup = () => {
            setActiveGrp && setActiveGrp(id);
            const params = new URLSearchParams(searchParams);
            params.set('selectedGrp', id.toString());
            setSearchParams(params);
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
