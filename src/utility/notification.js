let publicVapidKey =
    "BCUXSY76CeFb0sew7-j4Hb5VJXEafGiFZKbV0oL5Nf_RO9HjiM2ISZ676KcVJLvy2zB88w_XnEkG2kPsU9vqf_U";
export default class Notify {
    constructor(register) {
        this.register = register;
    }

    urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    async getSubscription(){
        const subscription = await this.register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey)
        });
        return subscription;
    }

    async send() {
        await fetch("https://web-push-custom--pratyush93.repl.co/subscribe", {
            method: "POST",
            body: JSON.stringify(this.getSubscription()),
            headers: {
                "content-type": "application/json"
            }
        });
    }

    createNotification(){
        if ("serviceWorker" in navigator) {
            this.send().catch(err => console.log("This happened: ", err));
          }
    }

}







