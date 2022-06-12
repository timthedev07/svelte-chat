<script lang="ts">
  import { io } from "../lib/socket";
  import { onMount } from "svelte";
  import type { Message } from "../types";

  let messages: Message[] = [];
  let draft: string;

  onMount(() => {
    io.on("message", (message) => {
      // Listen to the message event
      messages = [...messages, message];
    });
    io.on("name", (name) => {
      // Another listener for the name:
      // username = name // Update the name so it can be displayed
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
    <li>
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
