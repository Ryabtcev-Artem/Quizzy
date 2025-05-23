class LoadTestImages {
    constructor() {}
    getAllSrc = async () => {
        try {
            const response = await fetch(
                `../tests/test${this.testId}/test${this.testId}Questions.json`
            );
            if (!response.ok) throw new Error("HTTP error");
            this.questions = await response.json();
        } catch (error) {
            console.error("Couldn't load questions:", error);
        }
    };
    loadImages = async () => {
        this.testId = document.querySelector("body").getAttribute("test-id");
        await this.getAllSrc();
        this.srcArray = [];
        for (let object of this.questions) {
            this.srcArray.push(object.image);
        }
        return Promise.all(
            this.srcArray.map((src) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            })
        );
    };
}
export default LoadTestImages;
