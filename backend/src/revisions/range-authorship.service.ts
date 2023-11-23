/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { AbsolutePositionAuthorship } from '@hedgedoc/commons';
import { Injectable } from '@nestjs/common';

import { RangeAuthorshipDto } from './range-authorship.dto';
import { RangeAuthorship } from './range-authorship.entity';
import { Revision } from './revision.entity';

@Injectable()
export class RangeAuthorshipService {
  createRangeAuthorshipsFromAbsolutePositions(
    absolutePositions: AbsolutePositionAuthorship[],
    revision: Revision,
    noteLength: number,
  ): RangeAuthorship[] {
    return absolutePositions
      .sort(([positionA], [positionB]) => {
        return positionB - positionA;
      })
      .reduce<RangeAuthorship[]>((authorships, [startPosition, user]) => {
        const author = user;
        const endPosition = authorships[0]?.startPos - 1 ?? noteLength;
        authorships.unshift(
          RangeAuthorship.create(
            author,
            startPosition,
            endPosition,
            revision,
          ) as RangeAuthorship,
        );
        return authorships;
      }, []);
  }

  async toRangeAuthorshipDto(
    rangeAuthorship: RangeAuthorship,
  ): Promise<RangeAuthorshipDto> {
    const authorUser = await (await rangeAuthorship.author).user;

    return {
      username: authorUser ? authorUser.username : null,
      startPos: rangeAuthorship.startPos,
      endPos: rangeAuthorship.endPos,
      createdAt: rangeAuthorship.createdAt,
      updatedAt: rangeAuthorship.updatedAt,
    };
  }
}
