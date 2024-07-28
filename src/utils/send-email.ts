import { FormProps } from '@/app/[lang]/page';

export function sendEmail(data: FormProps) {
    const apiEndpoint = "../api/email";

    fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}