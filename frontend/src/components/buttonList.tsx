type ButtonListProps = {
    rooms: string;
    onButtonClick: (label: string) => void;
    mode: 'min' | 'max';
    currentMin: number | null;
    currentMax: number | null;
  };

export function ButtonList({ rooms, onButtonClick, mode, currentMin, currentMax}: ButtonListProps)
{
    const buttonLabels: string[] = rooms.split(",");

    return (
        <div>
            {buttonLabels.map((label, index) => {
                // const splitString: string[] = label.split(" ");
                const match = label.match(/\d+/);
                const value = match ? parseInt(match[0]) : null;
                
                let disabled = false;

                if (value !== null)
                {
                    if(mode === 'min' && currentMax !== null)
                    {
                        disabled = value > currentMax;
                    }
                    else if (mode === 'max' && currentMin !== null)
                    {
                        disabled = value < currentMin;
                    }
                }

                return (
                    <button key={index} onClick={() => onButtonClick(label)} disabled={disabled} className={'rooms ' + index}>{label}</button>
                );
            })}
        </div>
    );
};