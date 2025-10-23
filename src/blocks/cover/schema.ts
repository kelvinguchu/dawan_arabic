import {Block} from "payload";

export const Cover: Block = {
    slug: "cover",
    fields: [
        {
            name: "heading",
            type: "richText",
            label: "Heading",
            required: true,
            localized: true,
        },
        {
            name: "subheading",
            type: "text",
            label: "Subheading",
            required: true,
            localized: true,
        },
        {
            name: "image",
            type: "upload",
            label: "Image",
            relationTo: "media",
        },
        
    ],
};


