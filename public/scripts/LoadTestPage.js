import StartGame from "./StartGame.js";

class LoadTestPage {
    selectors = {
        loadResources: '[data-js-load-resources]',
    }
    init = () => {
        this.loadResources = document.querySelector(this.selectors.loadResources)
    }
    constructor() {
        this.init()
        this.loadTestPreviewImages()
    }
    loadPreviewImages = async() =>{
        this.testId = document.querySelector('body').getAttribute('test-id')
        this.srcArray = []
        const response = await fetch(`./tests/test${this.testId}/test${this.testId}Info.json`)
        this.testInfo = await response.json()
        this.imagesFormat = this.testInfo.imagesFormat
        this.srcArray.push(`./images/tests/test-${this.testId}/preview.${this.imagesFormat}`)
        this.srcArray.push(`./images/test/totest/astronaut-black.svg`)
        this.srcArray.push(`./images/test/totest/astronaut-yellow.svg`)
        return Promise.all(
            this.srcArray.map((src)=>{
                return new Promise((resolve,reject)=>{
                    const img = new Image
                    img.src = src
                    img.onload = () => resolve(img)
                    img.onerror = reject;
                })
            })
        )
    }
    loadTestPreviewImages = async() =>{
        await this.loadPreviewImages()
        setTimeout(()=>{
            this.loadResources.classList.remove('active')

        },340)
        new StartGame()
    }
}
export default LoadTestPage
