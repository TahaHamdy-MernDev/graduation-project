            

function Toasts() {
  return (
    <div className="container-toast">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <img
            className="imgStyle-toast"
            src="https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain"
            alt="img"
          />
        </div>

        <div className="totas-content">
          <h3 style={{ color: "rgba(76, 175, 175, 0.5)" }}>
            لدي مشكلة مع دالة input
          </h3>
          <p>بواسطة محمود مرسي منذ 3 ساعة</p>
        </div>
      </div>
    </div>
  );
}

export default Toasts;
