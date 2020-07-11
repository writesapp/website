import axios from "axios";

const newWriteWebhook = (user, values) => {
  axios({
    method: "post",
    url:
      "https://discordapp.com/api/webhooks/730738993456742460/C7TXj_PP2GUWyNBi1CMxeZ1iNaUipZLMfxVVkVgpez0nMxR35U6L3HSePzipxnLNT7i3",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: "writes.",
      avatar_url: "https://i.imgur.com/Y1xEDKg.png",
      content: "[<@&730737168179527770>] A new write has been submitted!",
      embeds: [
        {
          author: {
            name: user.displayName,
            icon_url: user.photoURL,
          },
          title: values.title,
          url: "https://writes.ga/",
          description: values.description,
          color: 15658734,
          footer: {
            text: values.tags,
          },
          timestamp: new Date(),
        },
      ],
    },
  });
};

export { newWriteWebhook };
