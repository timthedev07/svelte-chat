<script lang="ts">
  import { io } from "../lib/socket";
  import { onMount } from "svelte";

  let messages: any[] = [];
  let draft: string;

  onMount(() => {
    // join public room
    io.emit("joinRoom", {
      roomId: "public",
      userId: "hard-coded",
    });

    // load any existing messages
    io.on("loadMessages", (newMessages) => {
      messages = [...messages, ...newMessages];
    });

    // new message
    io.on("message", (message) => {
      messages = [...messages, message];
    });
  });

  const sendMessage = () => {
    const message = draft.trim();
    if (!message) return;

    draft = "";
    io.emit("message", message); // Send the message
  };
</script>

<ul>
  {#each messages as message}
    <li
      class={`m-2 rounded-lg bg-slate-500/10 border-2 border-slate-400/50 py-2 px-7 ${
        message.type === "notice" ? "text-white/70 italic" : "text-white"
      }`}
    >
      {message.message}
    </li>
  {/each}
</ul>
<form
  action="#"
  on:submit|preventDefault={sendMessage}
  class="rounded-md border p-8"
>
  <input
    bind:value={draft}
    class="bg-slate-200/60 rounded-md px-5 py-2 border-slate-500/60"
  />
  <button class="px-5 py-3 rounded-md bg-black text-white" type="submit"
    >Send</button
  >
</form>
