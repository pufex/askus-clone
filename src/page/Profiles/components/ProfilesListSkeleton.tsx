import {
    SkeletonCirlce,
    SkeletonParagraph,
    SkeletonTextShort,
    SkeletonTextMid,
    SkeletonButton
} from "../../../components/Skeleton"

const ProfilesListSkeleton = () => {
    return <div className="profiles__skeleton-wrapper">
        <div className="profile__skeleton">
            <div className="profile__skeleton--side">
                <SkeletonCirlce />
                <SkeletonParagraph>
                    <SkeletonTextShort/>
                    <SkeletonTextMid/>
                </SkeletonParagraph>
            </div>
            <SkeletonButton />
        </div>
        <div className="profile__skeleton">
            <div className="profile__skeleton--side">
                <SkeletonCirlce />
                <SkeletonParagraph>
                    <SkeletonTextShort/>
                    <SkeletonTextMid/>
                </SkeletonParagraph>
            </div>
            <SkeletonButton />
        </div>
        <div className="profile__skeleton">
            <div className="profile__skeleton--side">
                <SkeletonCirlce />
                <SkeletonParagraph>
                    <SkeletonTextShort/>
                    <SkeletonTextMid/>
                </SkeletonParagraph>
            </div>
            <SkeletonButton />
        </div>
        <div className="profile__skeleton">
            <div className="profile__skeleton--side">
                <SkeletonCirlce />
                <SkeletonParagraph>
                    <SkeletonTextShort/>
                    <SkeletonTextMid/>
                </SkeletonParagraph>
            </div>
            <SkeletonButton />
        </div>
        <div className="profile__skeleton">
            <div className="profile__skeleton--side">
                <SkeletonCirlce />
                <SkeletonParagraph>
                    <SkeletonTextShort/>
                    <SkeletonTextMid/>
                </SkeletonParagraph>
            </div>
            <SkeletonButton />
        </div>
        <div className="profile__skeleton">
            <div className="profile__skeleton--side">
                <SkeletonCirlce />
                <SkeletonParagraph>
                    <SkeletonTextShort/>
                    <SkeletonTextMid/>
                </SkeletonParagraph>
            </div>
            <SkeletonButton />
        </div>
    </div>
}

export default ProfilesListSkeleton
