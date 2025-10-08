"use client"
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@heroui/dropdown";
import {Avatar, AvatarGroup, AvatarIcon} from "@heroui/avatar";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

// export const Navbar = () => {
//   const searchInput = (
//     <Input
//       aria-label="Search"
//       classNames={{
//         inputWrapper: "bg-default-100",
//         input: "text-sm",
//       }}
//       endContent={
//         <Kbd className="hidden lg:inline-block" keys={["command"]}>
//           K
//         </Kbd>
//       }
//       labelPlacement="outside"
//       placeholder="Search..."
//       startContent={
//         <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
//       }
//       type="search"
//     />
//   );

//   return (
//     <HeroUINavbar maxWidth="xl" position="sticky">
//       <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
//         <NavbarBrand as="li" className="gap-3 max-w-fit">
//           <NextLink className="flex justify-start items-center gap-1" href="/">
//             <Logo />
//             <p className="font-bold text-inherit">ACME</p>
//           </NextLink>
//         </NavbarBrand>
//         <ul className="hidden lg:flex gap-4 justify-start ml-2">
//           {siteConfig.navItems.map((item) => (
//             <NavbarItem key={item.href}>
//               <NextLink
//                 className={clsx(
//                   linkStyles({ color: "foreground" }),
//                   "data-[active=true]:text-primary data-[active=true]:font-medium",
//                 )}
//                 color="foreground"
//                 href={item.href}
//               >
//                 {item.label}
//               </NextLink>
//             </NavbarItem>
//           ))}
//         </ul>
//       </NavbarContent>

//       <NavbarContent
//         className="hidden sm:flex basis-1/5 sm:basis-full"
//         justify="end"
//       >
//         <NavbarItem className="hidden sm:flex gap-2">
//           <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
//             <TwitterIcon className="text-default-500" />
//           </Link>
//           <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
//             <DiscordIcon className="text-default-500" />
//           </Link>
//           <Link isExternal aria-label="Github" href={siteConfig.links.github}>
//             <GithubIcon className="text-default-500" />
//           </Link>
//           <ThemeSwitch />
//         </NavbarItem>
//         <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
//         <NavbarItem className="hidden md:flex">
//           <Button
//             isExternal
//             as={Link}
//             className="text-sm font-normal text-default-600 bg-default-100"
//             href={siteConfig.links.sponsor}
//             startContent={<HeartFilledIcon className="text-danger" />}
//             variant="flat"
//           >
//             Sponsor
//           </Button>
//         </NavbarItem>
//       </NavbarContent>

//       <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
//         <Link isExternal aria-label="Github" href={siteConfig.links.github}>
//           <GithubIcon className="text-default-500" />
//         </Link>
//         <ThemeSwitch />
//         <NavbarMenuToggle />
//       </NavbarContent>

//       <NavbarMenu>
//         {searchInput}
//         <div className="mx-4 mt-2 flex flex-col gap-2">
//           {siteConfig.navMenuItems.map((item, index) => (
//             <NavbarMenuItem key={`${item}-${index}`}>
//               <Link
//                 color={
//                   index === 2
//                     ? "primary"
//                     : index === siteConfig.navMenuItems.length - 1
//                       ? "danger"
//                       : "foreground"
//                 }
//                 href="#"
//                 size="lg"
//               >
//                 {item.label}
//               </Link>
//             </NavbarMenuItem>
//           ))}
//         </div>
//       </NavbarMenu>
//     </HeroUINavbar>
//   );
// };

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <HeroUINavbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ContagIA</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/dashboard"}>
          <Link color={pathname === "/dashboard" ? "secondary" : "foreground"} href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/upload"}>
          <Link color={pathname === "/upload" ? "secondary" : "foreground"} href="/upload">
            Upload
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/relatorios"}>
          <Link color={pathname === "/relatorios" ? "secondary" : "foreground"} href="/relatorios">
            Relatórios
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">Minhas configurações</DropdownItem>
            <DropdownItem key="team_settings">Configurações da Equipe</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="configurations">Configurações</DropdownItem>
            <DropdownItem key="help_and_feedback">Ajuda e Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HeroUINavbar>
  );
}