"use client"

import { useState } from "react"
import { MessageCircle, Heart, Share2, MapPin, ThumbsUp, Users } from "lucide-react"

const posts = [
  {
    id: "1",
    user: "Arif Rahman",
    avatar: "AR",
    time: "2 hours ago",
    location: "Dhanmondi, Dhaka",
    content:
      "The air quality around Dhanmondi lake has been noticeably worse this week. Has anyone else noticed the thick haze in the morning? My kids have been coughing more than usual.",
    likes: 42,
    comments: 14,
    tag: "ALERT",
    tagColor: "#ef4444",
  },
  {
    id: "2",
    user: "Priya Sharma",
    avatar: "PS",
    time: "5 hours ago",
    location: "Gulshan, Dhaka",
    content:
      "Great news! The Gulshan DNCC ward planted 500 trees yesterday along the lake boulevard. Small steps toward cleaner air. Join the next planting drive this Saturday!",
    likes: 128,
    comments: 31,
    tag: "COMMUNITY",
    tagColor: "#10b981",
  },
  {
    id: "3",
    user: "Md. Kamal",
    avatar: "MK",
    time: "Yesterday",
    location: "Mirpur, Dhaka",
    content:
      "PSA: brick kilns in Mirpur are still burning at full capacity. AQI in this area regularly hits 180+. We need stricter enforcement from the DoE. Please share to raise awareness.",
    likes: 89,
    comments: 27,
    tag: "NEWS",
    tagColor: "#3b82f6",
  },
]

const stats = [
  { icon: Users, label: "Active Members", value: "12,400", color: "#10b981" },
  { icon: MessageCircle, label: "Reports Today", value: "238", color: "#3b82f6" },
  { icon: ThumbsUp, label: "Actions Taken", value: "1,892", color: "#f97316" },
  { icon: MapPin, label: "Locations Covered", value: "64", color: "#a78bfa" },
]

export default function CommunityPage() {
  const [newPost, setNewPost] = useState("")

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-4 flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${color}18` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--foreground)]">{value}</p>
              <p className="text-[10px] text-[var(--foreground-muted)]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Post composer */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/30 flex items-center justify-center shrink-0 text-[var(--primary)] font-semibold text-sm">
            You
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share an observation or report local air quality..."
              className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] outline-none focus:border-[var(--primary)]/50 resize-none min-h-[80px] transition-colors"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1.5 text-[var(--foreground-muted)]">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs">Dhaka, Bangladesh</span>
              </div>
              <button className="bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[var(--primary-dim)] transition-colors">
                Post Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/20 flex items-center justify-center text-xs font-bold text-[var(--primary)] shrink-0">
                {post.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    {post.user}
                  </span>
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase"
                    style={{ backgroundColor: `${post.tagColor}20`, color: post.tagColor }}
                  >
                    {post.tag}
                  </span>
                  <span className="text-xs text-[var(--foreground-dim)] ml-auto">
                    {post.time}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[var(--foreground-dim)] mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {post.location}
                </div>
                <p className="text-sm text-[var(--foreground-muted)] mt-2.5 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <button className="flex items-center gap-1.5 text-xs text-[var(--foreground-dim)] hover:text-[var(--primary)] transition-colors">
                    <Heart className="w-3.5 h-3.5" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-[var(--foreground-dim)] hover:text-[var(--primary)] transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-[var(--foreground-dim)] hover:text-[var(--primary)] transition-colors ml-auto">
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
