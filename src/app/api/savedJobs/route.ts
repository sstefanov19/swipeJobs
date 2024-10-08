import { NextRequest, NextResponse } from "next/server";
import prisma from '~/server/db';


export async function POST(req: NextRequest) {
        const body = await req.json() as { title: string;  description: string; redirect_url: string };

        const savedJob = await prisma.savedJob.create({
          data: {
            title: body.title,
            description: body.description,
            redirectUrl: body.redirect_url,
          },
        });


        const response = {
            ...savedJob ,
            id : savedJob.id.toString(),
        }
        console.log("SavedJobs " , savedJob);

        return NextResponse.json(response);
      }
