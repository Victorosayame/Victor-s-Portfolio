import {
  handleUpload,
  type HandleUploadBody,
} from "@vercel/blob/client";

import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/session";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_PDF_SIZE = 10 * 1024 * 1024;

const IMAGE_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const PDF_CONTENT_TYPES = [
  "application/pdf",
];

function getUploadConfig(pathname: string) {
  if (pathname.startsWith("profile/")) {
    return {
      allowedContentTypes: IMAGE_CONTENT_TYPES,
      maximumSizeInBytes: MAX_IMAGE_SIZE,
    };
  }

  if (pathname.startsWith("projects/")) {
    return {
      allowedContentTypes: IMAGE_CONTENT_TYPES,
      maximumSizeInBytes: MAX_IMAGE_SIZE,
    };
  }

  if (pathname.startsWith("resume/")) {
    return {
      allowedContentTypes: PDF_CONTENT_TYPES,
      maximumSizeInBytes: MAX_PDF_SIZE,
    };
  }

  return null;
}

export async function POST(
  request: Request,
): Promise<NextResponse> {
  try {
    const body =
      (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,

      onBeforeGenerateToken: async (pathname) => {
        await requireAdmin();

        const config = getUploadConfig(pathname);

        if (!config) {
          throw new Error(
            "Invalid upload path.",
          );
        }

        return {
          allowedContentTypes:
            config.allowedContentTypes,

          maximumSizeInBytes:
            config.maximumSizeInBytes,

          addRandomSuffix: true,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error(
      "Failed to generate Blob upload token:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to prepare file upload.",
      },
      { status: 400 },
    );
  }
}