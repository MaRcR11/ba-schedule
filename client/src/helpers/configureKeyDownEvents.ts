const configureKeyDownEvents = () => {
    window.addEventListener("keydown", (e) => {
        const btn1 = document.getElementById("e-tbr-btn_1");
        const btn0 = document.getElementById("e-tbr-btn_0");

        switch (e.key) {
            case "Right":
            case "ArrowRight":
                e.preventDefault();
                btn1?.click();
                btn1?.blur();
                break;
            case "Left":
            case "ArrowLeft":
                e.preventDefault();
                btn0?.click();
                btn0?.blur();
                break;
            default:
                break;
        }
    });
};

export default configureKeyDownEvents