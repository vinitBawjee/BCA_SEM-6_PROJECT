import css from "./Bid_Notification.module.css";

const BidNotification = () => {
    const notifications = [
        { id: 1, message: "Your bid of $500 on Laptop has been accepted.", time: "2 mins ago" },
        { id: 2, message: "Admin has updated auction rules.", time: "10 mins ago" },
        { id: 3, message: "Your bid on Phone was outbid by another user.", time: "30 mins ago" },
        { id: 4, message: "Auction for Watch is closing soon!", time: "1 hour ago" }
    ];

    return (
        <div className={`${css['notification_container']} p-3`}>
            <ul className="list-group h-100">
                {notifications.map((notify) => (
                    <li key={notify.id} className="list-group-item d-flex justify-content-between align-items-center mt-2 border rounded bg-transparent">
                        <span>{notify.message}</span>
                        <small className="text-muted">{notify.time}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BidNotification;
