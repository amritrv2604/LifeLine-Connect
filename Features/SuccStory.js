const stories = [
  `"For years, I battled severe anxiety and depression. It started in college when the pressure of exams, social life, and my future became overwhelming. I withdrew from friends and spent most of my time alone, feeling hopeless.  
  One day, I hit rock bottom and decided to seek help. I started therapy, where I learned coping mechanisms like deep breathing, journaling, and recognizing my negative thought patterns. Over time, I also joined a support group where I met people who understood my struggles.  
  It wasn't an overnight change, but gradually, I began to feel like myself again. Today, I am thriving in my career, have a supportive circle of friends, and even mentor others who face similar challenges. Life gets better when you take the first step toward healing."`,

  `"After losing my job unexpectedly, I spiraled into depression. I had always defined myself by my career, so when it was taken away from me, I felt like I had lost my identity.  
  The first few months were the hardest—I barely ate, slept poorly, and avoided friends and family. But then I realized that I needed to rebuild my confidence. I started by updating my resume, taking online courses, and attending networking events.  
  Slowly but surely, I found my way back. A few months later, I landed a job that was even better than my previous one. But more importantly, I learned that my self-worth isn’t tied to a job. Today, I value myself for who I am, not just what I do."`,

  `"I grew up in a strict environment where showing emotions was considered a weakness. As I got older, I struggled to express my feelings and built emotional walls around myself. This led to strained relationships and deep loneliness.  
  One day, a close friend encouraged me to seek therapy. At first, I resisted, but I finally gave it a try. Through counseling, I learned how to communicate better and embrace my emotions instead of suppressing them.  
  Over time, I reconnected with loved ones and built stronger relationships. Today, I openly share my feelings, and I’ve created a life filled with trust, love, and genuine connections. It’s never too late to heal and grow."`,

  `"There was a time when I could barely leave my house due to crippling social anxiety. I would avoid family gatherings, skip school events, and even cancel plans with friends because the thought of interacting with people terrified me.  
  It took years, but I finally took my first small step—I started therapy and read self-help books on confidence-building. Slowly, I began practicing mindfulness, exposing myself to social situations one step at a time.  
  Today, I give presentations at work, have built strong friendships, and even help others facing social anxiety. Looking back, I realize that taking small, consistent steps was the key to overcoming my fear."`,

  `"I lost someone very close to me, and for months, I struggled with overwhelming grief. I couldn’t focus on work, and I felt emotionally disconnected from the world.  
  A friend suggested joining a grief support group, but I was hesitant. However, after attending my first session, I realized I wasn’t alone. I found comfort in listening to others who had gone through similar experiences.  
  Gradually, I learned how to honor my loved one’s memory while also taking care of my own well-being. I began journaling, exercising, and surrounding myself with positive influences. Today, I feel stronger, knowing that healing is a journey, not a destination."`,

  `"Mark had been battling depression for years, feeling isolated and unworthy. One day, he took a brave step—he confided in a close friend. That conversation changed his life. Encouraged by their support, he sought therapy and discovered the power of self-care, gratitude, and community. Today, Mark volunteers at a mental health organization, offering hope to those who feel lost."`,

  `"Priya was always the go-getter, constantly chasing deadlines and neglecting her own well-being. It wasn’t until she faced burnout that she realized she needed a change. She started small—taking evening walks, saying 'no' when needed, and practicing mindfulness. With time, she regained her energy. Now, Priya speaks at corporate wellness events, reminding professionals that mental health is just as important as career success."`,

  `"Ryan’s social anxiety made even simple conversations feel like a nightmare. He avoided public speaking at all costs. But one day, he decided to take one small step—introducing himself to a new person. He practiced daily, joined support groups, and challenged himself with public speaking exercises. Years later, Ryan now delivers TED Talks, inspiring people to step out of their comfort zones and embrace their true selves."`,

  `"Sofia had endured emotional trauma that left deep scars. She found it difficult to trust and express her emotions. One day, she started writing poetry, and it became her therapy. Her words, raw and real, connected with others who had similar experiences. She later published her first book, proving that our pain can transform into something beautiful when we find the right outlet."`,

  `"James had his first panic attack in college. It left him feeling terrified of open spaces and crowds. His world became smaller as he avoided public places. But one day, he decided to fight back. Through CBT therapy, breathing exercises, and exposure therapy, he slowly regained his freedom. Today, James travels the world, sharing his story and helping others conquer their fears."`,
];

function openPopup(index) {
  document.getElementById("fullStory").innerText = stories[index];
  document.getElementById("popupOverlay").style.display = "flex";
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
}
