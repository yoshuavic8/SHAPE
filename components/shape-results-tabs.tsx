"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShapeRadarChart } from "@/components/shape-radar-chart"
import { ResultsChart } from "@/components/results-chart"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import type { CategoryScore } from "@/lib/results-analyzer"
import type { ShapeRecommendations } from "@/lib/results-analyzer"

interface ShapeResultsTabsProps {
  spiritualGifts: CategoryScore[]
  heartDesire: CategoryScore[]
  personality: CategoryScore[]
  experiences: CategoryScore[]
  recommendations: ShapeRecommendations
}

export function ShapeResultsTabs({
  spiritualGifts,
  heartDesire,
  personality,
  experiences,
  recommendations,
}: ShapeResultsTabsProps) {
  // Get abilities from personality results
  const abilities = personality.filter(item => item.category.includes("Kemampuan:"))

  // Get personality type results
  const personalityTypes = personality.filter(item => !item.category.includes("Kemampuan:"))

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="spiritual">Spiritual</TabsTrigger>
        <TabsTrigger value="heart">Heart</TabsTrigger>
        <TabsTrigger value="personality">Personality</TabsTrigger>
        <TabsTrigger value="experiences">Experiences</TabsTrigger>
        <TabsTrigger value="development">Development</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your SHAPE Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <ShapeRadarChart
              spiritualGifts={spiritualGifts}
              heartDesire={heartDesire}
              personality={personality}
              experiences={experiences}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Purpose Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{recommendations.purposeStatement}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SHAPE Synergy</CardTitle>
            <CardDescription>Bagaimana komponen SHAPE Anda saling melengkapi</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.shapeSynergy.map((synergy: string, index: number) => (
                <li key={index}>{synergy}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personalized Advice</CardTitle>
            <CardDescription>Saran khusus berdasarkan profil SHAPE Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.personalizedAdvice.map((advice: string, index: number) => (
                <li key={index}>{advice}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="development" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Strengths & Weaknesses</CardTitle>
            <CardDescription>Kekuatan dan area pengembangan berdasarkan profil SHAPE Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="strengths">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-green-50 text-green-700 mr-2">Strengths</Badge>
                    <span>Kekuatan Anda</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-2">
                    {recommendations.strengthsWeaknesses.strengths.map((strength: string, index: number) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="weaknesses">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 mr-2">Growth Areas</Badge>
                    <span>Area Pengembangan Anda</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-2">
                    {recommendations.strengthsWeaknesses.weaknesses.map((weakness: string, index: number) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Pathways</CardTitle>
            <CardDescription>Jalur pembelajaran yang direkomendasikan untuk mengembangkan potensi Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.learningPathways.map((pathway: string, index: number) => (
                <li key={index}>{pathway}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Roles</CardTitle>
            <CardDescription>Peran yang cocok untuk Anda dalam komunitas berdasarkan profil SHAPE</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.communityRoles.map((role: string, index: number) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Development Recommendations</CardTitle>
            <CardDescription>Rekomendasi pengembangan diri berdasarkan profil SHAPE Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.developmentRecommendations.map((rec: string, index: number) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="spiritual" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Spiritual Gifts</CardTitle>
          </CardHeader>
          <CardContent>
            <ResultsChart data={spiritualGifts} title="" colorClass="bg-green-500" />

            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2">What are Spiritual Gifts?</h4>
              <p className="text-muted-foreground">
                Spiritual gifts are divine abilities given by God to serve others and build up the church.
                These gifts are meant to be used for the common good and to glorify God.
              </p>

              <h4 className="text-lg font-bold mt-4 mb-2">Your Top Spiritual Gifts</h4>
              <div className="space-y-4">
                {spiritualGifts.slice(0, 3).map((gift, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h5 className="font-bold">{gift.category}</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getSpiritualGiftDescription(gift.category)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="heart" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Heart Desire</CardTitle>
          </CardHeader>
          <CardContent>
            <ResultsChart data={heartDesire} title="" colorClass="bg-red-500" />

            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2">What is Heart Desire?</h4>
              <p className="text-muted-foreground">
                Your heart desire reveals what you love and what motivates you. It represents the causes
                and people groups you naturally care about and are passionate to serve.
              </p>

              <h4 className="text-lg font-bold mt-4 mb-2">Your Top Heart Desires</h4>
              <div className="space-y-4">
                {heartDesire.slice(0, 3).map((heart, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h5 className="font-bold">{heart.category}</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getHeartDesireDescription(heart.category)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="personality" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personality & Abilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <ResultsChart data={personalityTypes} title="Personality Type" colorClass="bg-purple-500" />
              <ResultsChart data={abilities} title="Abilities" colorClass="bg-blue-500" />
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2">Your Personality Type</h4>
              <p className="text-muted-foreground">
                Your personality traits influence how you interact with others and handle tasks.
                Understanding your personality helps you find roles that are a good fit for you.
              </p>

              {personalityTypes.length > 0 && personalityTypes[0].category.includes("Tipe Kepribadian") && (
                <div className="p-4 border rounded-lg mt-4">
                  <h5 className="font-bold">{personalityTypes[0].category}</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getPersonalityDescription(personalityTypes[0].category)}
                  </p>
                </div>
              )}

              <h4 className="text-lg font-bold mt-6 mb-2">Your Top Abilities</h4>
              <div className="space-y-4">
                {abilities.slice(0, 3).map((ability, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h5 className="font-bold">{ability.category}</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getAbilityDescription(ability.category)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="experiences" className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Experiences</CardTitle>
          </CardHeader>
          <CardContent>
            <ResultsChart data={experiences} title="" colorClass="bg-amber-500" />

            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2">What are Experiences?</h4>
              <p className="text-muted-foreground">
                Your experiences shape who you are and provide valuable insights for your future.
                Both positive and challenging experiences can be used to help others.
              </p>

              <h4 className="text-lg font-bold mt-4 mb-2">Your Key Experiences</h4>
              <div className="space-y-4">
                {experiences.slice(0, 3).map((exp, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h5 className="font-bold">{exp.category}</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getExperienceDescription(exp.category)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

// Helper functions to get descriptions
function getSpiritualGiftDescription(gift: string): string {
  const descriptions: Record<string, string> = {
    "Mengajar": "The ability to explain Scripture and spiritual principles in a way that is clear and relevant, helping others learn and grow in their faith.",
    "Melayani": "The ability to identify and meet practical needs, often behind the scenes, with a spirit of humility and cheerfulness.",
    "Memimpin": "The ability to cast vision, motivate, and guide people toward achieving goals that align with God's purposes.",
    "Nubuat": "The ability to boldly proclaim God's truth in a way that challenges, corrects, or encourages others.",
    "Memberi": "The ability to generously contribute material resources with joy and simplicity to further God's work.",
    "Kemurahan": "The ability to empathize with those who are suffering and provide compassionate care and support.",
    "Evangelisme": "The ability to effectively communicate the gospel to non-believers in a way that draws them to Christ.",
    "Pengetahuan": "The ability to discover, analyze, and systematize truth for the benefit of others.",
    "Hikmat": "The ability to apply spiritual insight to complex situations and provide godly guidance.",
    "Iman": "The ability to trust God confidently in challenging circumstances and inspire others to do the same.",
    "Penyembuhan": "The ability to be used by God to restore health to the sick through prayer and faith.",
    "Membimbing": "The ability to guide and nurture others toward spiritual maturity.",
    "Administrasi": "The ability to organize people and resources effectively to accomplish goals.",
  }

  // Extract the gift name from the category (which might include a score)
  const giftName = gift.split(" ")[0]

  return descriptions[giftName] || "A divine ability given by God to serve others and build up the church."
}

function getHeartDesireDescription(heart: string): string {
  const descriptions: Record<string, string> = {
    "Anak-anak": "You have a passion for nurturing and developing children, helping them grow spiritually, emotionally, and intellectually.",
    "Remaja": "You have a heart for guiding teenagers through their formative years, helping them navigate challenges and develop their identity in Christ.",
    "Keluarga": "You are passionate about strengthening family units, promoting healthy relationships, and supporting parents in raising godly children.",
    "Lansia": "You care deeply about the elderly, desiring to honor, support, and learn from their wisdom and experience.",
    "Pendidikan": "You are passionate about teaching and learning, believing in the transformative power of education.",
    "Misi": "You have a heart for reaching unreached people groups with the gospel and supporting cross-cultural ministry.",
    "Pelayanan Sosial": "You are driven to meet practical needs in your community and show God's love through tangible acts of service.",
    "Konseling": "You have a passion for walking alongside people through their struggles and helping them find healing and hope.",
    "Seni": "You love expressing faith through creative arts and using artistic gifts to glorify God and inspire others.",
    "Teknologi": "You are excited about leveraging technology to advance God's kingdom and reach people in the digital age.",
  }

  return descriptions[heart] || "An area of passion that motivates you to serve others in specific ways."
}

function getPersonalityDescription(personality: string): string {
  // Extract the MBTI type from the category
  const mbtiType = personality.split(": ")[1]

  const descriptions: Record<string, string> = {
    "ISTJ": "Quiet, serious, and responsible. You are practical, matter-of-fact, and realistic, valuing traditions and loyalty.",
    "ISFJ": "Quiet, friendly, and conscientious. You are committed to meeting obligations and serving others with practical help.",
    "INFJ": "Idealistic, organized, and insightful. You seek meaning and connection, committed to your values and to helping others.",
    "INTJ": "Independent, analytical, and determined. You have high standards and are driven to implement your ideas and achieve your goals.",
    "ISTP": "Tolerant, flexible, and observant. You are interested in how and why things work and can quickly solve practical problems.",
    "ISFP": "Quiet, friendly, and sensitive. You enjoy the present moment and what's going on around you, valuing personal freedom.",
    "INFP": "Idealistic, loyal, and curious. You seek to understand people and help them fulfill their potential.",
    "INTP": "Logical, original, and curious. You seek to develop logical explanations for everything that interests you.",
    "ESTP": "Flexible, tolerant, and spontaneous. You focus on immediate results, enjoying material comforts and learning through hands-on experience.",
    "ESFP": "Outgoing, friendly, and accepting. You enjoy working with others to make things happen and bring a practical approach to your work.",
    "ENFP": "Enthusiastic, creative, and sociable. You see possibilities everywhere and connect people with ideas and each other.",
    "ENTP": "Quick, ingenious, and outspoken. You enjoy intellectual challenges and see connections between concepts.",
    "ESTJ": "Practical, realistic, and decisive. You focus on getting results in the most efficient way possible.",
    "ESFJ": "Warmhearted, conscientious, and cooperative. You value harmony and work to create it, noticing others' needs.",
    "ENFJ": "Warm, empathetic, and responsible. You are attuned to others' needs and help others fulfill their potential.",
    "ENTJ": "Frank, decisive, and strategic. You quickly see inefficiency and organize people and systems to achieve goals.",
  }

  return descriptions[mbtiType] || "Your personality traits influence how you interact with others and handle tasks."
}

function getAbilityDescription(ability: string): string {
  // Extract the ability name from the category
  const abilityName = ability.replace("Kemampuan: ", "")

  const descriptions: Record<string, string> = {
    "Menulis": "You have a talent for expressing ideas clearly and creatively through written communication.",
    "Public Speaking": "You have the ability to communicate effectively to groups, holding their attention and conveying information clearly.",
    "Seni": "You have creative talents in visual arts, able to express ideas and emotions through artistic mediums.",
    "Musik": "You have musical abilities, whether instrumental, vocal, or compositional, that can inspire and move others.",
    "Organisasi": "You have a talent for creating order out of chaos, structuring tasks, and managing details effectively.",
    "Analitis": "You have the ability to examine information critically, identify patterns, and solve complex problems.",
    "Teknologi": "You have skills in understanding and utilizing technology to accomplish tasks and solve problems.",
    "Interpersonal": "You have the ability to connect with others, understand their needs, and build meaningful relationships.",
    "Kreativitas": "You have the ability to generate original ideas and approach problems from unique perspectives.",
    "Kepemimpinan": "You have the ability to inspire and guide others toward achieving common goals.",
  }

  return descriptions[abilityName] || "A natural talent or learned skill that you can use to serve others and fulfill your purpose."
}

function getExperienceDescription(experience: string): string {
  // Check if it's a theme experience
  if (experience.includes("Tema Pengalaman:")) {
    const theme = experience.replace("Tema Pengalaman: ", "")

    const themeDescriptions: Record<string, string> = {
      "Kepemimpinan": "Your leadership experiences have equipped you with skills in guiding others, making decisions, and taking responsibility.",
      "Pengajaran": "Your teaching experiences have developed your ability to communicate knowledge and help others learn and grow.",
      "Pelayanan": "Your service experiences have cultivated a heart for meeting needs and supporting others in practical ways.",
      "Kreativitas": "Your creative experiences have nurtured your ability to think outside the box and express ideas in unique ways.",
      "Analitis": "Your analytical experiences have sharpened your critical thinking and problem-solving abilities.",
      "Ketahanan": "Your experiences with adversity have built resilience and the ability to persevere through challenges.",
      "Spiritual": "Your spiritual experiences have deepened your faith and understanding of God's work in your life.",
      "Relasional": "Your relational experiences have developed your ability to connect with others and build meaningful relationships.",
    }

    return themeDescriptions[theme] || "A pattern of experiences that has shaped your character and abilities."
  }

  return "An experience that has contributed to your growth and prepared you for your purpose."
}
