interface GetRoomMessagesRequest {
  roomId: string;
}

export interface GetRoomMessagesResponse {
  messages: {
    id: string;
    roomId: string;
    text: string;
    amountOfReactions: number;
    answered: boolean;
  }[];
}

export async function getRoomMessages({
  roomId,
}: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`
  );

  const data: Array<{
    ID: string;
    RoomID: string;
    Message: string;
    ReactionsCount: number;
    Answered: boolean;
  }> = await response.json();

  return {
    messages: data.map((item) => {
      return {
        id: item.ID,
        roomId: item.RoomID,
        text: item.Message,
        amountOfReactions: item.ReactionsCount,
        answered: item.Answered,
      };
    }),
  };
}
