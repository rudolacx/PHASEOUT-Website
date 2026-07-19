"use client";

type VideoPlayerProps = {
  url: string;
};

function parseVideo(url: string) {
  try {
    const trimmed = url.trim();
    const parsed = new URL(
      trimmed.startsWith("http") ? trimmed : `https://${trimmed}`
    );

    const host = parsed.hostname.replace("www.", "");

    // ---- YouTube ----
    if (host === "youtu.be") {
      const id = parsed.pathname.split("/")[1];
      if (id) return { type: "youtube" as const, id };
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        if (id) return { type: "youtube" as const, id };
      }

      const parts = parsed.pathname.split("/").filter(Boolean);

      if (
        parts.length >= 2 &&
        ["embed", "shorts", "live"].includes(parts[0])
      ) {
        return { type: "youtube" as const, id: parts[1] };
      }
    }

    // ---- Twitch ----
    if (host === "clips.twitch.tv") {
      const slug = parsed.pathname.split("/").filter(Boolean)[0];
      if (slug) return { type: "twitch-clip" as const, id: slug };
    }

    if (host === "twitch.tv") {
      const parts = parsed.pathname.split("/").filter(Boolean);

      // twitch.tv/{channel}/clip/{slug}
      const clipIndex = parts.indexOf("clip");
      if (clipIndex !== -1 && parts[clipIndex + 1]) {
        return { type: "twitch-clip" as const, id: parts[clipIndex + 1] };
      }

      // twitch.tv/videos/{id}
      if (parts[0] === "videos" && parts[1]) {
        return { type: "twitch-video" as const, id: parts[1] };
      }

      // twitch.tv/{channel}
      if (parts[0]) {
        return { type: "twitch-channel" as const, id: parts[0] };
      }
    }

    // ---- 네이버 TV ----
    if (host === "tv.naver.com") {
      const parts = parsed.pathname.split("/").filter(Boolean);

      // tv.naver.com/v/{id}
      if (parts[0] === "v" && parts[1]) {
        return { type: "navertv" as const, id: parts[1] };
      }
    }

    // ---- 직접 업로드된 영상 파일 ----
    if (/\.(mp4|webm|ogg)$/i.test(parsed.pathname)) {
      return { type: "file" as const, id: trimmed };
    }

    // ---- gif / 이미지 파일 ----
    if (/\.(gif|png|jpe?g|webp)$/i.test(parsed.pathname)) {
      return { type: "image" as const, id: trimmed };
    }

    return { type: "unknown" as const, id: "" };
  } catch {
    return { type: "unknown" as const, id: "" };
  }
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const video = parseVideo(url);

  const parentHost =
    typeof window !== "undefined"
      ? window.location.hostname
      : "phaseout-website.vercel.app";

  if (video.type === "youtube") {
    return (
      <iframe
        className="aspect-video w-full rounded-xl"
        src={`https://www.youtube.com/embed/${video.id}`}
        allowFullScreen
      />
    );
  }

  if (video.type === "twitch-clip") {
    return (
      <iframe
        className="aspect-video w-full rounded-xl"
        src={`https://clips.twitch.tv/embed?clip=${video.id}&parent=${parentHost}&autoplay=false`}
        allowFullScreen
      />
    );
  }

  if (video.type === "twitch-video") {
    return (
      <iframe
        className="aspect-video w-full rounded-xl"
        src={`https://player.twitch.tv/?video=${video.id}&parent=${parentHost}&autoplay=false`}
        allowFullScreen
      />
    );
  }

  if (video.type === "twitch-channel") {
    return (
      <iframe
        className="aspect-video w-full rounded-xl"
        src={`https://player.twitch.tv/?channel=${video.id}&parent=${parentHost}&autoplay=false`}
        allowFullScreen
      />
    );
  }

  if (video.type === "navertv") {
    return (
      <iframe
        className="aspect-video w-full rounded-xl"
        src={`https://tv.naver.com/embed/${video.id}`}
        allowFullScreen
      />
    );
  }

  if (video.type === "file") {
    return (
      <video
        className="aspect-video w-full rounded-xl bg-black"
        src={video.id}
        controls
      />
    );
  }

  if (video.type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="w-full rounded-xl bg-black object-contain"
        src={video.id}
        alt="clip"
      />
    );
  }

  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl bg-zinc-800 text-center">
      <p className="text-gray-400">영상을 불러올 수 없어요</p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:underline"
      >
        원본 링크에서 보기
      </a>
    </div>
  );
}
