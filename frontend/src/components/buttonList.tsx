type ButtonListProps = {
    rooms: string;
    onButtonClick: (label: string) => void;
  };

export function ButtonList({ rooms, onButtonClick}: ButtonListProps)
{
    const buttonLabels: string[] = rooms.split(",");

    return (
        <div>
            {buttonLabels.map((label, index) => (
                <button onClick={() => onButtonClick(label)} className={'rooms ' + index}>{label}</button>
            ))}
        </div>
    );
};