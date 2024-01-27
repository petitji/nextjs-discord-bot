import ky from "ky"
import { APIEmbed } from "discord-api-types/v10";
import { Region } from "@/types/regions";

const ADVENTURE_SHEET_ID = "1U8VgUfGFkGDdA7HNo8AM40naaZ85MNlXefvO9AOKZ8E";
const API_URL = "https://script.google.com/macros/s/AKfycbwvk9eWN2Rpor1e8CQdmOftkT0VyqNbePowMtBeSgaVfoDRkIIDZ03XV0-HA_yyl1L9mw/exec?sheetName=";

const createEmbedObject = (source: string, path: string): APIEmbed => {
    return {
        title: "Random Pic",
        description: "Here's your random pic!"
    }
  }
  
/**
 * 조사 시작
 * @param sheetId 
 */
export async function startAdventure(): Promise<APIEmbed>  {
    const { data } = await ky.get(`${API_URL}basic`).json<{ data: Region[] }>()
    const possibleRegions = data
        .filter(function(obj) {
        return obj.canAdventure === "Y"
        })
        .map(function(obj) {
        return obj.regionName
        });

    console.log('possibleRegions', possibleRegions)

    return {
        title: "조사를 시작합니다.",
        description: possibleRegions.join(',')
    }
  }
