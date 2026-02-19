import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Mail,
  Briefcase,
  GraduationCap,
  ChevronRight,
  ArrowDown,
  Calendar,
  Wrench,
  BarChart3,
  Users,
  HardHat,
  Rocket,
  Shield,
} from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { motion } from "framer-motion";
import profilePhoto from "@assets/github.com_Connor1016329_tab=repositories_1771529883670.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

function SectionLabel({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 h-0.5 w-10 bg-accent rounded-full" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85" />
        </div>

        <nav className="relative z-10 flex items-center justify-between gap-4 px-6 py-4 max-w-4xl mx-auto" data-testid="nav-bar">
          <span className="text-white/80 font-medium tracking-tight" data-testid="text-logo">Connor Neistadt</span>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="ghost" size="icon" asChild className="text-white/60">
              <a href="https://github.com/Connor1016329" target="_blank" rel="noopener noreferrer" data-testid="link-github">
                <SiGithub className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-white/60">
              <a href="https://www.linkedin.com/in/connor-lee-neistadt-061047241/" target="_blank" rel="noopener noreferrer" data-testid="link-linkedin">
                <SiLinkedin className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </nav>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-20 md:pt-16 md:pb-28"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
            <motion.div variants={fadeUp} custom={0} className="flex-shrink-0">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-white/15">
                <img
                  src={profilePhoto}
                  alt="Connor Neistadt"
                  className="w-full h-full object-cover object-top"
                  data-testid="img-profile"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                data-testid="text-name"
              >Connor Lee Neistadt</motion.h1>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-3 text-base text-white/65 max-w-lg leading-relaxed"
                data-testid="text-headline"
              >Four years active duty USMC infantry. CEO of Sherrell Corp an entertainment rigging company. Currently building a hardware / software startup. Background in managing teams, finances, vendors, and large-scale installations.</motion.p>
              <motion.div variants={fadeUp} custom={3} className="mt-5 flex items-center gap-3 flex-wrap">
                <Button variant="default" asChild data-testid="button-contact">
                  <a href="mailto:clneistadt@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </a>
                </Button>
                <Button variant="outline" className="bg-white/5 backdrop-blur-sm border-white/15 text-white/85" asChild data-testid="button-resume">
                  <a href="#experience">
                    Experience
                    <ArrowDown className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
      {/* Professional Summary */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-18" data-testid="section-summary">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel title="Professional Summary" />
          </motion.div>
          <motion.div variants={fadeUp} custom={1}>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3" data-testid="text-summary">
              <p>
                Four years active duty in the United States Marine Corps (infantry, MOS 0311), where I held Team Leader, Squad Leader, and Company Administrative Coordinator roles. Built and maintained a readiness tracking system covering training, medical status, and accountability for approximately 400 Marines.
              </p>
              <p>Since 2021, CEO of Sherrell Corp, a 25+ year theatrical rigging company with roughly 20 employees and $200K-$500K in annual revenue. Manage accounting, payroll, HR, vendor negotiations, and project execution, including installations exceeding $175K and securing a $100K+ annual government contract.</p>
              <p>
                In December 2025, founded Terra Scout, an early-stage hardware and software startup focused on off-grid communication systems. Currently managing product development, vendor partnerships, and prototype testing.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
      <Separator className="max-w-4xl mx-auto" />
      {/* Career Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-18" data-testid="section-timeline">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel title="Career Timeline" />
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="space-y-0">
            {[
              { year: "2017", text: "Graduated high school one year early." },
              { year: "2017-2021", text: "United States Marine Corps, Active Duty Infantry (MOS 0311). Team Leader, Squad Leader, Company Administrative Coordinator." },
              { year: "2021-Present", text: "Sherrell Corp (Las Vegas, NV). Progression: Lead Rigger to Assistant CEO to CEO (remote)." },
              { year: "2021-2022", text: "College of Southern Nevada. Computer Science coursework." },
              { year: "2022-2024", text: "Computer Science Tutor, Utah Valley University. Tutored students in basic and advanced C++." },
              { year: "2022-Present", text: "Utah Valley University. Transitioned from Computer Science to Business Strategy & Entrepreneurship." },
              { year: "2023-Present", text: "Utah Valley University Sandbox Program. Building early-stage startups." },
              { year: "Dec 2025-Present", text: "Founded Terra Scout. Hardware and software startup focused on off-grid communication systems." },
            ].map((item, idx) => (
              <div key={idx} className="relative pl-8 py-3 group" data-testid={`timeline-item-${idx}`}>
                <div className="absolute left-0 top-[18px] w-2.5 h-2.5 rounded-full border-2 border-accent bg-background z-10" />
                {idx < 7 && <div className="absolute left-[4px] top-[28px] bottom-0 w-0.5 bg-border" />}
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <span className="text-xs font-mono text-accent font-medium flex-shrink-0 w-28" data-testid={`timeline-year-${idx}`}>{item.year}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{item.text}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
      <Separator className="max-w-4xl mx-auto" />
      {/* Operations & Leadership Experience */}
      <section id="experience" className="max-w-4xl mx-auto px-6 py-14 md:py-18" data-testid="section-experience">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel title="Operations & Leadership Experience" />
          </motion.div>

          {/* Sherrell Corp */}
          <motion.div variants={fadeUp} custom={1} className="mb-10">
            <Card className="p-6" data-testid="card-experience-sherrell">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-semibold text-foreground" data-testid="text-role-sherrell">CEO</h3>
                  <p className="text-sm text-accent font-medium">Sherrell Corp</p>
                  <p className="text-xs text-muted-foreground mt-0.5">25+ year company specializing in theatrical rigging and installation. ~20 employees, $200K-$500K annual revenue.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0 flex-wrap">
                  <Calendar className="w-3 h-3" />
                  <span>2021 - Present</span>
                  <span>|</span>
                  <MapPin className="w-3 h-3" />
                  <span>Las Vegas, NV (Remote)</span>
                </div>
              </div>

              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Responsibilities</p>
              <ul className="space-y-1.5 mb-5">
                {[
                  "Managed accounting, payroll, HR, scheduling, and project management",
                  "Oversaw vendor negotiations and contract administration",
                  "Coordinated multi-contractor job sites and workforce logistics",
                  "Led financial operations and insurance negotiations",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Key Results</p>
              <ul className="space-y-1.5">
                {[
                  "Secured and managed a $100K+ annual government contract for school district theater inspection and repair",
                  "Negotiated insurance restructuring that reduced annual costs by over $150K while expanding coverage",
                  "Directed a $175K+ installation project at Mandalay Bay Casino, coordinating 7 riggers and multiple external contractors under strict deadlines",
                  "Led a $100K+ installation suspending an Oracle Red Bull Racing F1 car inside Omnia Nightclub",
                  "Directed aerial entertainment rigging for opening ceremony of Bleu Fontaine Casino",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* USMC */}
          <motion.div variants={fadeUp} custom={2} className="mb-10">
            <Card className="p-6" data-testid="card-experience-usmc">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-semibold text-foreground" data-testid="text-role-usmc">Infantry Marine / Administrative Coordinator</h3>
                  <p className="text-sm text-accent font-medium">United States Marine Corps</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Active Duty, MOS 0311. Roles: Team Leader, Squad Leader, Company Administrative Coordinator.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0 flex-wrap">
                  <Calendar className="w-3 h-3" />
                  <span>2017 - 2021</span>
                </div>
              </div>

              <ul className="space-y-1.5">
                {[
                  "Developed a company-wide tracking system monitoring training, medical status, and readiness for approximately 400 Marines",
                  "Authorized as an E3 to coordinate accountability across multiple ranks, including NCOs and officers",
                  "Held Team Leader and Squad Leader positions with direct responsibility for personnel readiness and coordination",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Terra Scout */}
          <motion.div variants={fadeUp} custom={3}>
            <Card className="p-6" data-testid="card-experience-terrascout">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2 flex-wrap" data-testid="text-role-terrascout">
                    Founder
                    <Badge variant="secondary" className="text-xs">Current</Badge>
                  </h3>
                  <p className="text-sm text-accent font-medium">Terra Scout</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Early-stage hardware and software startup focused on off-grid real-time communication systems.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0 flex-wrap">
                  <Calendar className="w-3 h-3" />
                  <span>Dec 2025 - Present</span>
                </div>
              </div>

              <ul className="space-y-1.5">
                {[
                  "Led product development, vendor negotiations, and prototype testing",
                  "Coordinated engineering and manufacturing partnerships",
                  "Built and tested 10 functional hardware units",
                  "Negotiated development/manufacturing partnership with Education 2 Impact at minimal company cost",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      </section>
      <Separator className="max-w-4xl mx-auto" />
      {/* Data, Systems, and Technical Skills */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-18" data-testid="section-skills">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel title="Data, Systems, and Technical Skills" />
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="p-5" data-testid="card-skills-ops">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Briefcase className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Business & Operations</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["QuickBooks", "Excel", "Google Workspace", "Monday.com", "Trello", "Payroll Systems", "AP/AR", "Insurance Admin"].map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs font-medium">{s}</Badge>
                ))}
              </div>
            </Card>

            <Card className="p-5" data-testid="card-skills-tech">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Wrench className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Technical</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["TypeScript", "React / React Native", "Next.js", "Node.js", "C++", "GitHub Workflows", "Hardware Prototyping", "Custom Automation Tools"].map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs font-medium">{s}</Badge>
                ))}
              </div>
            </Card>

            <Card className="p-5" data-testid="card-skills-analytics">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <BarChart3 className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Analytical</h3>
              </div>
              <ul className="space-y-1">
                {[
                  "Built operational tracking systems for military readiness management",
                  "Managed financial reporting and payroll systems",
                  "Developed project tracking workflows and scheduling systems",
                  "Designed process improvements to increase efficiency and accountability",
                ].map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                    <ChevronRight className="w-3 h-3 mt-0.5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5" data-testid="card-skills-leadership">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Users className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Management & Coordination</h3>
              </div>
              <ul className="space-y-1">
                {[
                  "Managed teams of up to 20 employees and coordinated multi-contractor job sites",
                  "Oversaw vendor negotiations, contract administration, and broker relationships",
                  "Coordinated accountability across ranks for ~400 personnel (USMC)",
                  "Handled payroll, HR, scheduling, and financial reporting for a $200K-$500K company",
                  "Managed project budgets from $5K to $175K+",
                ].map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                    <ChevronRight className="w-3 h-3 mt-0.5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      </section>
      <Separator className="max-w-4xl mx-auto" />
      {/* Notable Projects & Achievements */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-18" data-testid="section-projects">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel title="Notable Projects & Achievements" />
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="space-y-4">
            {[
              {
                icon: HardHat,
                title: "Mandalay Bay Casino Installation",
                detail: "$175K+ project. Coordinated 7 riggers and multiple external contractors under strict venue deadlines.",
              },
              {
                icon: HardHat,
                title: "Omnia Nightclub / Red Bull Racing",
                detail: "$100K+ installation suspending an Oracle Red Bull Racing F1 car inside the nightclub, coordinated with venue operations team.",
              },
              {
                icon: HardHat,
                title: "Bleu Fontaine Casino Opening",
                detail: "Directed aerial entertainment rigging for the casino's opening ceremony.",
              },
              {
                icon: Shield,
                title: "Government Contract Management",
                detail: "Secured and managed a $100K+ annual government contract for school district theater inspection and repair across multiple sites.",
              },
              {
                icon: Shield,
                title: "Insurance Restructuring",
                detail: "Negotiated insurance restructuring that reduced annual costs by over $150K while expanding coverage.",
              },
              {
                icon: Rocket,
                title: "Terra Scout Hardware Prototypes",
                detail: "Built and tested 10 functional hardware units for off-grid communication. Negotiated manufacturing partnership with Education 2 Impact at minimal cost.",
              },
              {
                icon: Shield,
                title: "Marine Corps Readiness System",
                detail: "Developed a company-wide tracking system monitoring training, medical status, and readiness for approximately 400 Marines. Authorized as E3 to coordinate across NCOs and officers.",
              },
              {
                icon: GraduationCap,
                title: "Church-School Equipment Partnership (Pre-2017)",
                detail: "As a high school student, partnered with local churches on behalf of the school to provide technical equipment at no cost in return for usage of the theater during non-school hours.",
              },
            ].map((project, idx) => (
              <Card key={idx} className="p-4 hover-elevate" data-testid={`card-project-${idx}`}>
                <div className="flex items-start gap-3 flex-wrap">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center mt-0.5">
                    <project.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-foreground">{project.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{project.detail}</p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </section>
      <Separator className="max-w-4xl mx-auto" />
      {/* Education */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-18" data-testid="section-education">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel title="Education" />
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="space-y-4">
            <Card className="p-5" data-testid="card-education-uvu">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-shrink-0 w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm" data-testid="text-education-uvu">Utah Valley University</h3>
                  <p className="text-xs text-muted-foreground">Business Strategy & Entrepreneurship (formerly Computer Science)</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Sandbox Program participant, 2023-Present</p>
                </div>
              </div>
            </Card>

            <Card className="p-5" data-testid="card-education-csn">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-shrink-0 w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm" data-testid="text-education-csn">College of Southern Nevada</h3>
                  <p className="text-xs text-muted-foreground">Computer Science coursework</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </section>
      <Separator className="max-w-4xl mx-auto" />
      {/* Leadership & Problem-Solving Examples */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-18" data-testid="section-leadership">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel title="Leadership & Problem-Solving Examples" />
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="space-y-4">
            <Card className="p-5" data-testid="card-leadership-0">
              <h3 className="text-sm font-medium text-foreground mb-1">On-Site Safety Intervention (Sherrell Corp, 2021)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                During early rigging work at Sherrell Corp, identified and intervened in a safety-critical situation on a live job site, preventing potential serious injury to crew members.
              </p>
            </Card>

            <Card className="p-5" data-testid="card-leadership-1">
              <h3 className="text-sm font-medium text-foreground mb-1">Readiness Tracking System (USMC, 2018-2021)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                As an E3, was authorized to build and maintain a company-wide tracking system for approximately 400 Marines, a responsibility typically held by higher-ranking personnel. The system tracked training completion, medical readiness, and personnel accountability across multiple units and was used by NCOs and officers for daily operations.
              </p>
            </Card>

            <Card className="p-5" data-testid="card-leadership-2">
              <h3 className="text-sm font-medium text-foreground mb-1">Technical Theater Program (Pre-2017)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Before graduating high school early in 2017, managed department budgets and production logistics for the school's technical theater program. Coordinated partnerships with local organizations. Repaired a long-failed sound system previously deemed unrepairable by the district. Planned and executed events ranging from $5K to $50K in scale.
              </p>
            </Card>

            <Card className="p-5" data-testid="card-leadership-3">
              <h3 className="text-sm font-medium text-foreground mb-1">Insurance Restructuring (Sherrell Corp, 2022)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Identified inefficiencies in the company's insurance structure and independently negotiated a restructuring that cut annual costs by over $150K while expanding coverage. Required understanding policy details, assessing risk exposure for rigging work, and managing broker relationships.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </section>
      {/* Footer */}
      <footer className="border-t border-border" data-testid="section-footer">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6" data-testid="footer-content">
            <div>
              <h3 className="font-semibold text-foreground">Connor Lee Neistadt</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Available for operations, business leadership, and startup roles.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Button variant="default" asChild data-testid="button-footer-email">
                <a href="mailto:clneistadt@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </a>
              </Button>
              <Button variant="outline" asChild data-testid="button-footer-linkedin">
                <a href="https://www.linkedin.com/in/connor-lee-neistadt-061047241/" target="_blank" rel="noopener noreferrer">
                  <SiLinkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild data-testid="button-footer-github">
                <a href="https://github.com/Connor1016329" target="_blank" rel="noopener noreferrer">
                  <SiGithub className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
