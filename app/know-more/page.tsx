"use client";

export default function KnowMorePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#010101] px-4 py-12">
      <div className="w-full max-w-2xl bg-white/10 border border-white/10 rounded-2xl p-10 shadow-2xl backdrop-blur-md">
        <h1 className="text-3xl font-black text-white mb-6">What happens at Cohort 1?</h1>
        <p className="text-lg text-white mb-4">
          The first Mad Labs cohort is a <b>15-day sprint</b><br />
          where kids (ages 10–15) build something real.<br />
          a business, a film, a service, an event, a community, or a movement.<br />
          It must add value, have a purpose, and be their own.<br />
          They choose what to build.<br />
          We give them the pressure, tools, and guidance to do it.
        </p>
        <hr className="my-8 border-white/20" />
        <h2 className="text-2xl font-bold text-white mb-2">Who is this for?</h2>
        <ul className="list-disc pl-6 text-white/80 mb-4 space-y-1">
          <li>The kid who won't stop asking "Why?" — even when no one has answers</li>
          <li>The kid who takes things apart just to see how they work</li>
          <li>The kid who zones out in class but lights up when building or creating</li>
          <li>The kid with a spark — who cares deeply about something, but doesn't know where to begin</li>
        </ul>
        <p className="text-white/80 mb-4">They don't need to know how to code or speak on stage.<br />They just need to want to make something real.</p>
        <hr className="my-8 border-white/20" />
        <h2 className="text-2xl font-bold text-white mb-2">What do they build?</h2>
        <p className="text-white/80 mb-2">There's no fixed output. Each kid builds a different thing. Some real examples:</p>
        <ul className="list-disc pl-6 text-white/80 mb-4 space-y-1">
          <li>A micro-business that sells sustainable notebooks</li>
          <li>A storytelling podcast for kids</li>
          <li>A social movement to reduce food waste in school</li>
          <li>A workshop on managing exam pressure</li>
          <li>A small service that helps parents organise their digital files</li>
        </ul>
        <p className="text-white/80 mb-4">They build whatever feels real to them. And we help them shape it.</p>
        <hr className="my-8 border-white/20" />
        <h2 className="text-2xl font-bold text-white mb-2">What's the day-by-day structure?</h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full text-white/90 text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-white/60">
                <th className="px-2 py-1 text-left">Day</th>
                <th className="px-2 py-1 text-left">Phase</th>
                <th className="px-2 py-1 text-left">What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>IDEATE</td><td>Induction & Self-awareness</td></tr>
              <tr><td>2</td><td>IDEATE</td><td>Idea discovery - Find your deep calling & interests</td></tr>
              <tr><td>3</td><td>IDEATE</td><td>Make first call - Choose initial idea direction with mentor guidance</td></tr>
              <tr><td>4</td><td>EARLY BUILD</td><td>Sharpen direction - Define audience and purpose, work with Ideation AI Agent.</td></tr>
              <tr><td>5</td><td>EARLY BUILD</td><td>Begin outputs - Create initial drafts with Execution and Iteration AI agents</td></tr>
              <tr><td>6</td><td>EARLY BUILD</td><td>Midpoint check - One-on-one mentor review of progress</td></tr>
              <tr><td>7-9</td><td>BUILD + ITERATE</td><td>Build and test - Get feedback from peers, mentors, and AI agents</td></tr>
              <tr><td>10</td><td>BUILD + ITERATE</td><td>Iterate and reframe - Address weaknesses and improve</td></tr>
              <tr><td>11</td><td>BUILD + ITERATE</td><td>Second checkpoint - Deep review with mentor</td></tr>
              <tr><td>12</td><td>BUILD + ITERATE</td><td>Proof day - Test with real users and gather feedback</td></tr>
              <tr><td>13</td><td>STORYTELL</td><td>Shape pitch - Develop and practice presentation</td></tr>
              <tr><td>14</td><td>STORYTELL</td><td>Last ship - Final refinements and feedback</td></tr>
              <tr><td>15</td><td>DEMO DAY</td><td>Present project to mentors, friends, and strangers</td></tr>
            </tbody>
          </table>
        </div>
        <hr className="my-8 border-white/20" />
        <h2 className="text-2xl font-bold text-white mb-2">What tools do they use?</h2>
        <p className="text-white/80 mb-2">We've built 3 custom AI tools just for Mad Labs. They help kids move faster and think sharper.</p>
        <ul className="list-disc pl-6 text-white/80 mb-4 space-y-1">
          <li><b>Ideation Tool</b> → Helps them pick a strong idea and remove confusion</li>
          <li><b>Build Tool</b> → Helps them write, design, and create faster</li>
          <li><b>Feedback Tool</b> → Gives responses like a user, investor, or critic</li>
        </ul>
        <hr className="my-8 border-white/20" />
        <h2 className="text-2xl font-bold text-white mb-2">What do mentors do?</h2>
        <ul className="list-disc pl-6 text-white/80 mb-4 space-y-1">
          <li>They don't give lectures.</li>
          <li>They ask sharp questions that help kids think.</li>
          <li>They unblock in moments where kids are stuck, suggest directions, and push quality.</li>
          <li>But the kid builds everything.</li>
        </ul>
        <hr className="my-8 border-white/20" />
        <h2 className="text-2xl font-bold text-white mb-2">What does my kid walk away with?</h2>
        <ul className="list-disc pl-6 text-white/80 mb-4 space-y-1">
          <li>A real thing they made by themselves</li>
          <li>Clearer voice, sharper thinking, stronger execution</li>
          <li>Confidence in who they are</li>
          <li>Proof that they can create something from scratch</li>
          <li>Feedback from real people, not just praise</li>
        </ul>
        <hr className="my-8 border-white/20" />
        <h2 className="text-2xl font-bold text-white mb-2">What if they don't finish?</h2>
        <p className="text-white/80 mb-2">That's okay.<br />The goal isn't perfection.<br />It's momentum.<br />Even 60% of a real thing is better than a polished worksheet.</p>
      </div>
    </main>
  );
} 