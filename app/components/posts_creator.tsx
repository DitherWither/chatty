"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function PostCreator() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageAlt, setImageAlt] = useState("");

    function titleChanged(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value;
        setTitle(newTitle);
    }
    function imageUrlChanged(event: ChangeEvent<HTMLInputElement>) {
        const newUrl = event.target.value;
        setImageUrl(newUrl);
    }
    function imageAltChanged(event: ChangeEvent<HTMLInputElement>) {
        const newAlt = event.target.value;
        setImageAlt(newAlt);
    }
    function contentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        const newContent = event.target.value;
        setContent(newContent);
    }

    async function submit() {
        const body = {
            title,
            content: content.trim() == "" ? null : content,
            imageUrl: imageUrl.trim() == "" ? null : imageUrl,
            imageAlt: imageAlt.trim() == "" ? null : imageAlt,
        };

        // Make a POST request to the server
        fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((res) => {
            router.refresh()
        });
    }

    return (
        <div className="flex flex-col gap-3">
            <input type="text" onChange={titleChanged} placeholder="title" className="rounded-xl p-3 m-3 shadow-xl font-bold" />
            <input type="text" onChange={imageUrlChanged} placeholder="image url" className="rounded-xl p-3 m-3 shadow-xl font-bold" />
            <input
                type="text"
                onChange={imageAltChanged}
                placeholder="image alt text"
                className="rounded-xl p-3 m-3 shadow-xl font-bold"
            />
            <p className="my-3 mx-8 text-2xl font-bold">content</p>
            <textarea rows={30} cols={30} onChange={contentChanged} className="rounded-xl p-3 m-3 shadow-xl font-bold h-45"></textarea>
            <div className="flex justify-center items-center">
                <button onClick={submit} className="rounded-full shadow-xl font-black text-xl text-white bg-teal-500 py-5 px-12">submit</button>
            </div> 
        </div> 
    );
}
