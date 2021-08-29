import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Image, Wrapper } from "./templateStyles/carStyles"

const CarTemplate = ({
  data: {
    wpcontent: {
      car: {
        car,
        roles: { edges: roles },
      },
    },
  },
}) => {
  const { picture1, picture2, picture3 } = car.pictures
  const pictures = [picture1, picture2, picture3]

  return (
    <Layout>
      <Seo title="Car" />
      <Wrapper>
        <div className="car-container">
          <div className="car-image">
            <Image
              fluid={car.profile.imageFile.childImageSharp.fluid}
              alt={car.profile.altText}
            />
            <div className="roles">
              {roles.map(({ node: role }) => (
                <div key={role.name} className="role">
                  {role.name}
                </div>
              ))}
            </div>
          </div>
          <div className="car-info">
            <h2>
              {car.brand} {car.model}
            </h2>
            {car.country ? (
              <h3>
                <span>{car.country} -</span> <span>{car.city}</span>
              </h3>
            ) : (
              <h3>{car.city}</h3>
            )}
            <p className="description">{car.description}</p>
            <p className="info">
              <strong>Make year:</strong> {car.year}
            </p>
            <p className="info">
              <strong>Country:</strong> {car.country}
            </p>
            <p className="info">
              <strong>City:</strong> {car.city}
            </p>
          </div>
        </div>
        <div className="car-pictures">
          {pictures.map((picture, i) => (
            <div key={i} className="car-picture">
              <Image
                fluid={picture.imageFile.childImageSharp.fluid}
                alt={picture.altText}
              />
            </div>
          ))}
        </div>
      </Wrapper>
    </Layout>
  )
}

export default CarTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
      car(id: $id, idType: ID) {
        roles {
          edges {
            node {
              name
            }
          }
        }
        car {
          country
          description
          brand
          model
          city
          year
          profile {
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            altText
          }
          pictures {
            picture3 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
            picture2 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
            picture1 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
        id
      }
    }
  }
`