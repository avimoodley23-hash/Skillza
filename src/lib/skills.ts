import type React from 'react'
import { Camera, Video, Palette, Layers, PenLine, Globe, Share2, Music, Pen, GraduationCap, Mic, Tv, BookOpen, Megaphone, Code, Scissors, UtensilsCrossed, Dumbbell, Brush, Cpu } from 'lucide-react'

export const SKILLS = [
  'Photography', 'Videography', 'Graphic Design', 'Art Direction',
  'Digital Design', 'AI Design', 'Illustration', 'Fine Art', 'Other',
]

export const SKILL_EMOJIS: Record<string, string> = {
  'Photography':   '📸',
  'Videography':   '🎬',
  'Graphic Design':'🎨',
  'Art Direction': '🎯',
  'Digital Design':'💻',
  'AI Design':     '🤖',
  'Illustration':  '🖌️',
  'Fine Art':      '🖼️',
  'Other':         '⭐',
}

export const SKILL_ICONS: Record<string, React.ElementType> = {
  'Photography':   Camera,
  'Videography':   Video,
  'Graphic Design': Palette,
  'Art Direction': Layers,
  'Digital Design': Globe,
  'AI Design':     Cpu,
  'Illustration':  Pen,
  'Fine Art':      Brush,
  'Other':         GraduationCap,
}

export const SKILL_CATEGORIES: Record<string, string> = {
  'Photography':   'photography',
  'Videography':   'videography',
  'Graphic Design':'graphic-design',
  'Art Direction': 'art-direction',
  'Digital Design':'digital-design',
  'AI Design':     'ai-design',
  'Illustration':  'illustration',
  'Fine Art':      'fine-art',
  'Other':         'other',
}

export const BROWSE_CATEGORIES = [
  { id: 'all',           label: 'All',           icon: null },
  { id: 'photography',   label: 'Photography',   icon: Camera },
  { id: 'videography',   label: 'Videography',   icon: Video },
  { id: 'graphic-design',label: 'Graphic Design',icon: Palette },
  { id: 'art-direction', label: 'Art Direction', icon: Layers },
  { id: 'digital-design',label: 'Digital Design',icon: Globe },
  { id: 'ai-design',     label: 'AI Design',     icon: Cpu },
  { id: 'illustration',  label: 'Illustration',  icon: Pen },
  { id: 'fine-art',      label: 'Fine Art',      icon: Brush },
]

// General skill icon lookup used across components
const SKILL_ICON_MAP: Record<string, React.ElementType> = {
  'Photography': Camera,
  'Videography': Video,
  'Graphic Design': Palette,
  'Branding': Layers,
  'Copywriting': PenLine,
  'Web Design': Globe,
  'Social Media': Share2,
  'Music': Music,
  'Illustration': Pen,
  'Voiceover': Mic,
  'Presenting': Tv,
  'Tutoring': BookOpen,
  'Marketing': Megaphone,
  'Development': Code,
  'Hair': Scissors,
  'Catering': UtensilsCrossed,
  'Fitness': Dumbbell,
  'Art Direction': Layers,
  'Digital Design': Globe,
  'AI Design': Cpu,
  'Fine Art': Brush,
}

export function getSkillIcon(skill: string): React.ElementType {
  for (const [key, Icon] of Object.entries(SKILL_ICON_MAP)) {
    if (skill.toLowerCase().includes(key.toLowerCase())) return Icon
  }
  return GraduationCap
}
