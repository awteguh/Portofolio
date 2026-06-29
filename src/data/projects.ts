import type { Project } from "./types"

export const projects: Project[] = [
  {
    title: "Monitoring Dashboard",
    description:
      "Setup sistem monitoring infrastruktur menggunakan Beszel dan Zabbix untuk memantau performa server, resource usage, dan ketersediaan layanan secara real-time di lingkungan perusahaan.",
    tags: ["Beszel", "Zabbix", "Docker", "Linux"],
  },
  {
    title: "CI/CD Pipeline Automation",
    description:
      "Membangun dan mengimplementasikan pipeline CI/CD otomatis menggunakan Harness AI — mencakup build, test, dan deployment dengan AI-assisted pipeline intelligence untuk deteksi failure dan optimasi otomatis. Trigger menggunakan webhook dan pipeline berjalan di environment dev.",
    tags: ["Harness AI", "Webhook", "Docker", "CI/CD"],
    url: "https://github.com/awteguh/cicd-pipeline",
  },
  {
    title: "SIEM Integration",
    description:
      "Menerapkan sistem SIEM menggunakan Wazuh untuk memantau endpoint, mendeteksi ancaman keamanan, dan menganalisis log secara real-time.",
    tags: ["Wazuh", "Security"],
  },
  {
    title: "Infrastructure as Code",
    description:
      "Mengelola infrastruktur jaringan perusahaan menggunakan kombinasi Mikrotik dan Ruijie (AP) sebagai backbone konektivitas. Server berbasis Windows Server dengan virtualisasi menggunakan Hyper-V — mengelola VM untuk environment Dev, Production, dan Network Monitoring (Netmon).",
    tags: ["Mikrotik", "Ruijie", "Windows Server", "Hyper-V"],
  },
]
