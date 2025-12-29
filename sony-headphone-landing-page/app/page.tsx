"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Menu, Volume2, Headphones, Zap, Battery } from "lucide-react"
import { motion, useInView, useSpring, useMotionValue, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

function CountUp({ to, decimals = 0, suffix = "", prefix = "" }: { to: number; decimals?: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  })

  useEffect(() => {
    if (inView) {
      motionValue.set(to)
    }
  }, [inView, motionValue, to])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        // @ts-ignore
        ref.current.textContent = prefix + latest.toFixed(decimals) + suffix
      }
    })
    return unsubscribe
  }, [springValue, decimals, suffix, prefix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

export default function Home() {
  const [currentShowcaseImage, setCurrentShowcaseImage] = useState(0)
  const showcaseImages = [
    "/sony-headphones-detail-shot-showing-ear-cups-and-p.jpg",
    "/showcase-image-2.png"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentShowcaseImage((prev) => (prev + 1) % showcaseImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold tracking-tight"
            >
              SONY
            </motion.div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                특징
              </a>
              <a href="#specs" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                제품 사양
              </a>
              <a href="#reviews" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                리뷰
              </a>
              <Button size="sm" className="ml-4 hover:scale-105 transition-transform">
                구매하기
              </Button>
            </nav>
            <button className="md:hidden hover:scale-110 transition-transform">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full hover:bg-accent/20 transition-colors">
                신제품 출시
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance">
                소리의
                <br />
                새로운 차원
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                업계 최고 수준의 노이즈 캔슬링 기술을 경험하세요.
              </p>
              {/* Buttons removed as requested */}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl bg-secondary overflow-hidden hover:scale-105 transition-transform duration-500">
                <img
                  src="/hero-image-2.jpg"
                  alt="Sony 헤드폰"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 lg:px-8 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">프리미엄 기능</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              최첨단 기술이 담긴 소니 헤드폰의 핵심 기능을 확인하세요
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Volume2, title: "노이즈 캔슬링", desc: "업계 최고 수준의 노이즈 캔슬링으로 어디서든 완벽한 고요함을 경험하세요" },
              { icon: Headphones, title: "Hi-Res 오디오", desc: "하이레졸루션 오디오 지원으로 스튜디오 품질의 사운드를 즐기세요" },
              { icon: Battery, title: "긴 배터리", desc: "최대 30시간 재생으로 하루 종일 음악을 즐기세요" },
              { icon: Zap, title: "빠른 충전", desc: "10분 충전으로 5시간 재생 가능한 급속 충전 기술" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-square rounded-2xl bg-secondary overflow-hidden hover:scale-105 transition-transform duration-500 relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentShowcaseImage}
                    src={showcaseImages[currentShowcaseImage]}
                    alt="헤드폰 디테일"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-balance">
                완벽한 디자인,
                <br />
                최고의 편안함
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                인체공학적 디자인과 프리미엄 소재로 장시간 착용해도 편안합니다. 부드러운 이어 쿠션과 가벼운 무게로 하루
                종일 착용 가능합니다.
              </p>
              <ul className="space-y-3">
                {[
                  "프리미엄 가죽 이어 패드",
                  "접이식 디자인으로 휴대 간편",
                  "터치 센서 컨트롤"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 hover:translate-x-2 transition-transform">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-sm">✓</span>
                    </div>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 px-4 lg:px-8 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">제품 사양</h2>
            <Card className="p-8 hover:shadow-2xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {[
                    { label: "드라이버 유닛", value: <><CountUp to={40} suffix="mm" /></> },
                    { label: "주파수 응답", value: <><CountUp to={4} suffix="Hz" /> - <CountUp to={40} suffix="kHz" /></> },
                    { label: "배터리 수명", value: <>최대 <CountUp to={30} suffix="시간" /></> },
                    { label: "충전 시간", value: <>약 <CountUp to={3} suffix="시간" /></> }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex justify-between py-3 border-b border-border hover:border-accent/50 transition-colors"
                    >
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[
                    { label: "무게", value: <><CountUp to={254} suffix="g" /></> },
                    { label: "블루투스", value: <><CountUp to={5.2} decimals={1} /></> },
                    { label: "코덱", value: "LDAC, AAC, SBC" },
                    { label: "방수 등급", value: "IPX4" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }} // Slight offset for second column
                      className="flex justify-between py-3 border-b border-border hover:border-accent/50 transition-colors"
                    >
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Card className="bg-black/80 backdrop-blur-md border border-white/10 text-white p-12 lg:p-16 text-center shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance relative z-10">지금 바로 경험하세요</h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
                  소니의 프리미엄 헤드폰으로 최고의 오디오 경험을 시작하세요
                </p>
                <div className="flex flex-wrap gap-4 justify-center relative z-10">
                  <Button size="lg" variant="secondary" className="text-base px-8 hover:scale-110 transition-transform bg-white text-black hover:bg-white/90">
                    지금 구매하기
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 border-white/20 text-white hover:bg-white/10 bg-transparent hover:scale-110 transition-transform"
                  >
                    매장 찾기
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 lg:px-8 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">SONY</div>
              <p className="text-sm text-muted-foreground">프리미엄 오디오 경험을 선도하는 소니</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">제품</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-all">
                    헤드폰
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-all">
                    이어폰
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-all">
                    스피커
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-all">
                    고객 지원
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-all">
                    제품 등록
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-all">
                    보증 정보
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">회사</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-all">
                    소개
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-all">
                    뉴스
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-all">
                    채용
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 Sony Corporation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
