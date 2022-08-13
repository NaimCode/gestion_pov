import { ReactNode } from 'react';
//import BsTable

import { BsTable ,BsFillPeopleFill} from 'react-icons/bs';
//import BiDevices
import { BiDevices,BiChart } from 'react-icons/bi';
import {AiFillSchedule} from 'react-icons/ai';
import {MdContactPhone} from 'react-icons/md';
import {CgViewComfortable as AiTwotoneCheckCircle} from 'react-icons/cg';
type TWorkspaceMenu = {

  name: string
  route: string
  icon?:ReactNode
  divider?:boolean
};

export const workspaceMenu: Array<TWorkspaceMenu> = [
  {
    name: "Pov",
    route: "/workspace",
    icon:<BsTable />,
    divider:true
  },
  {
    name: "Appliances",
    route: "/workspace/appliances",
    icon:<BiDevices/>
  },
  {
    name: "Types",
    route: "/workspace/types",
    icon:<AiTwotoneCheckCircle/>,
    divider:true
  },
  {
    name: "Clients",
    route: "/workspace/clients",
    icon:<BsFillPeopleFill/>
  },
  {
    name: "Contact",
    route: "/workspace/contacts",
    icon:<MdContactPhone/>,
    divider:true
  },

  {
    name: "Suivis",
    route: "/workspace/suivis",
    icon:<BiChart/>
  },
  {
    name: "Préstations",
    route: "/workspace/prestations",
    icon:<AiTwotoneCheckCircle/>,
    divider:true
  },
  {
    name: "Séances",
    route: "/workspace/seances",
    icon:<AiFillSchedule/>
  },

];
