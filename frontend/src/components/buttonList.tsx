export function ButtonList({ rooms }: { rooms: string })
{
    const buttonLabels: string[] = rooms.split(",");

    return (
        <div>
            {buttonLabels.map((label, index) => (
                <button className={'rooms ' + index}>{label}</button>
            ))}
        </div>
    );
};