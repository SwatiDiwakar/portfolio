export interface Testimonial {
    id: string;
    content: string;
    author: string;
    role: string;
    company: string;
    image?: string;
    linkedinUrl?: string;
}

export const testimonials: Testimonial[] = [
    {
        id: '1',
        content: "Swati was a part of the core team at Hackberry for almost 3 years. In this time, she helped build out robust coding curriculum for grades 1 though 10, teacher training programs, coding workshops, assessments, and more. Swati is a true team player and always goes above and beyond to ensure that projects are completed to the highest standards. Additionally, she is always willing to lend a hand when needed. Her communication skills are excellent, and she is able to effectively communicate ideas and collaborate with others to achieve a common goal. Additionally, Swati has an extensive domain knowledge and a deep understanding of the latest industry trends. Her passion for her work is evident in the quality of her output, and she is always striving to improve and grow her knowledge.",
        author: "Ashni Dwarkadas",
        role: "Co-founder",
        company: "Hackberry",
        linkedinUrl: "https://www.linkedin.com/in/ashni-dwarkadas-20ba3b1/"
    },
    {
        id: '2',
        content: "It has been an absolute pleasure to have Swati at Hackberry. She has been a key member at Hackberry and has exceptional skills in creating engaging and effective curriculum for our students. Not only has she been an asset to us, she is always willing to go above and beyond to ensure that we deliver high-quality work. Her curious nature, enthusiasm and knowledge has been invaluable and hope we continue working together in the future.",
        author: "Anisha Parikh",
        role: "Co-founder",
        company: "Hackberry",
        linkedinUrl: "https://www.linkedin.com/in/anishaparikh/"
    },
    {
        id: '3',
        content: "Swati has been an integral part of our core team at Leo&Mike. The following are the reasons that I think puts Swati among the top 0.1%ile professional in her work area which is product development, curriculum development, project management and research in education/edtech for K12. 1. Super diligent - She has a belief that good work is good in itself. I have always watched her with amazement at the level of effort and perseverance that she brings to her work. Her strong work ethic alone makes her one of the top professionals that I have had the opportunity to work with. She is by nature very industrious and organized. 2. Team player - I could always count of Swati to be with the team during testing times. She actively supported her team members and gave them confidence when the chips were down. She was a go to person for many people in our team for advice. 3. Creative and hands-on - Swati is one of the most creative people that I have worked with. This was evident both in aesthetics and the out-of-the-box thinking that she displayed in her work. She is very inventive and is always curious to learn more about everything. I would highly recommend Swati to any organization that is looking for a very driven and conscientious senior professional.",
        author: "Abhilash Joseph",
        role: "MD",
        company: "Scrabble Middle East",
        linkedinUrl: "https://www.linkedin.com/in/abhilashjoseph01/"
    }
];