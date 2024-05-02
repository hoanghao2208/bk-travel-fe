import { FC, memo } from 'react';
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
        return (
            <div
                className={`group ${id === activeGrp ? 'group-active' : ''}`}
                onClick={() => setActiveGrp && setActiveGrp(id)}
            >
                <div className="group--item">
                    <img
                        src="/images/slide2.jpg"
                        alt="gr-avatar"
                        className="group--img"
                    />
                    <div className="group--info">
                        <span className="group--name">{name}</span>
                        <span className="group--desc">{desc}</span>
                    </div>
                </div>
            </div>
        );
    }
);

Group.displayName = 'Message Group';

export default Group;
