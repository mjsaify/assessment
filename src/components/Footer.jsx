import { Link } from "react-router-dom"


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6 px-16 font-sans tracking-wide">
            <div className="flex justify-between items-center max-lg:flex-col text-center flex-wrap gap-4">
                <p className="text-[15px] leading-loose">
                    © All rights reserved.
                </p>
                <ul className="flex space-x-6 gap-y-2 max-lg:justify-center flex-wrap">
                    <li>
                        <Link className="text-[15px] hover:text-white">
                            Terms of Service
                        </Link>
                    </li>
                    <li>
                        <Link className="text-[15px] hover:text-white">
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link className="text-[15px] hover:text-white">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer